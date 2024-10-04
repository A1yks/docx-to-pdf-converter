export type FileData = {
    id: string;
    name: string;
    size: number;
    status: 'uploading' | 'uploaded' | 'failed';
    progress: number;
    error: string | null;
    date: number;
    blob?: Blob;
};
