import { openDB } from 'idb';
import FakeProgress from 'fake-progress';
import { FileData } from './types/files';

const dbPromise = openDB('upload', 1, {
    upgrade(openedDB) {
        openedDB.createObjectStore('files', { keyPath: 'id' });
    },
});

dbPromise.then((db) => db.clear('files'));

// @ts-expect-error - TS doesn't know about fetch event
self.addEventListener('fetch', (event: FetchEvent) => {
    if (event.request.headers.get('Intercept-Me')) {
        event.respondWith(
            (async () => {
                const db = await dbPromise;
                let timer: ReturnType<typeof setInterval> | null = null;

                try {
                    const fileId = event.request.headers.get('File-Id');

                    if (!fileId) return Response.error();

                    const prevFileData: FileData = await db.get('files', fileId);
                    const fakeProgress = new FakeProgress({
                        timeConstant: Math.max((prevFileData?.size || 1e6) / 1024 / 1.5, 2000),
                        autoStart: true,
                    });

                    timer = setInterval(() => {
                        const newProgress = fakeProgress.progress * 100;

                        chrome.runtime.sendMessage({ type: 'update-file', payload: { id: fileId, progress: newProgress } }).catch(() => null);
                    }, 100);

                    const response = await self.fetch(event.request);

                    if (!response.ok) {
                        clearInterval(timer);
                        return response;
                    }

                    const clonedResponse = response.clone();

                    chrome.runtime.sendMessage({ type: 'update-file', payload: { id: fileId, progress: 100 } }).catch(() => null);
                    clearInterval(timer);

                    setTimeout(async () => {
                        await db.put('files', {
                            ...prevFileData,
                            status: 'uploaded',
                            blob: await clonedResponse.blob(),
                        });

                        chrome.runtime.sendMessage({ type: 'file-uploaded', payload: fileId }).catch(() => null);
                    }, 500);

                    return response;
                } catch {
                    if (timer) clearInterval(timer);

                    return Response.error();
                }
            })()
        );
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'showPopup') {
        chrome.action.openPopup().catch(() => null);
    }
});
