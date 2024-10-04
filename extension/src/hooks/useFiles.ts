import { useIndexedDB } from 'react-indexed-db-hook';
import { useEffect, useState } from 'react';
import { useDbUpdateListener } from '@/events';
import { FileData } from '@/types/files';
import { useFilesAPI } from './useFilesAPI';

export function useFiles() {
    const db = useIndexedDB('files');
    const { updateFile } = useFilesAPI();
    const [loaded, setLoaded] = useState(false);
    const [files, setFiles] = useState<FileData[]>([]);

    useEffect(() => {
        function listener({ type, payload }: Record<string, any>) {
            if (type === 'file-uploaded') {
                const fileId = payload;
                updateFile(fileId, { status: 'uploaded' });
                return;
            }

            if (type === 'update-file') {
                updateFile(payload.id, payload);
            }

            return true;
        }

        chrome.runtime.onMessage.addListener(listener);

        return () => {
            chrome.runtime.onMessage.removeListener(listener);
        };
    }, [updateFile]);

    useDbUpdateListener(({ type, payload }) => {
        if (type === 'add') {
            setFilesAndSort((files) => [...files, payload as FileData]);
        } else if (type === 'update') {
            setFilesAndSort((files) => files.map((f) => (f.id === payload.id ? { ...f, ...payload } : f)));
        } else if (type === 'delete') {
            setFilesAndSort((files) => files.filter((f) => f.id !== payload.id));
        }
    });

    function setFilesAndSort(value: React.SetStateAction<FileData[]>) {
        setFiles((prev) => {
            const newValue = typeof value === 'function' ? value(prev) : value;
            return newValue.sort((a, b) => a.date - b.date);
        });
    }

    useEffect(() => {
        if (!loaded) {
            db.getAll().then((files) => {
                setFilesAndSort(files);
                setLoaded(true);
            });
        }
    }, [db, loaded]);

    return { files, loaded };
}
