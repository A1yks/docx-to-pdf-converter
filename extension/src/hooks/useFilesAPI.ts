import { useIndexedDB } from 'react-indexed-db-hook';
import { api } from '@/api';
import { v4 as uuid } from 'uuid';
import { emitDbUpdate } from '@/events';
import { FileData } from '@/types/files';
import { useCallback } from 'react';
import { AxiosError } from 'axios';

export const supportedMimeTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
export const supportedTypes = ['doc', 'docx'];

export function useFilesAPI() {
    const db = useIndexedDB('files');

    const updateFile = useCallback(
        async (fileId: string, data: Partial<Omit<FileData, 'id'>>) => {
            const prevFileData = await db.getByID(fileId);

            await db.update({ id: fileId, ...prevFileData, ...data });
            emitDbUpdate({ type: 'update', payload: { id: fileId, ...data } });
        },
        [db]
    );

    async function removeFile(fileId: string) {
        await db.deleteRecord(fileId);
        emitDbUpdate({ type: 'delete', payload: { id: fileId } });
    }

    async function addFile(fileId: string, file: File) {
        const fileData: FileData = {
            id: fileId,
            name: file.name,
            size: file.size,
            status: 'uploading',
            progress: 0,
            error: null,
            date: Date.now(),
        };

        await db.add(fileData);
        emitDbUpdate({ type: 'add', payload: fileData });
    }

    async function sendFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        const fileId = uuid();

        await addFile(fileId, file);

        try {
            if (!supportedMimeTypes.includes(file.type)) {
                throw new Error('Not correct format');
            }

            await api.post('/convert', formData, {
                responseType: 'blob',
                headers: {
                    'File-Id': fileId,
                },
            });
        } catch (err) {
            let error = 'Unexpected error';

            if (err instanceof AxiosError) {
                error = (await err.response?.data?.text()) || null;
            } else if (err instanceof Error) {
                error = err.message;
            }

            await updateFile(fileId, { status: 'failed', error });
        }
    }

    function uploadFiles(files?: FileList) {
        if (files instanceof FileList) {
            for (const file of files) {
                sendFile(file);
            }

            return;
        }

        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = supportedTypes.map((type) => `.${type}`).join(',');

        input.onchange = async (event) => {
            const files = (event.target as HTMLInputElement).files || [];

            for (const file of files) {
                sendFile(file);
            }
        };

        input.click();
    }

    async function downloadFile(fileId: string) {
        const fileData: FileData = await db.getByID(fileId);

        if (fileData && fileData.blob) {
            const blob = fileData.blob;
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = fileData.name.replace(/\.docx?$/, '.pdf');
            a.click();
        }
    }

    return { downloadFile, uploadFiles, updateFile, removeFile, addFile, sendFile };
}
