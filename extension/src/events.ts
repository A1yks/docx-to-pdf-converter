import { createEvent } from 'react-event-hook';
import { FileData } from './types/files';

export type DBUpdateMessage = {
    type: 'add' | 'update' | 'delete';
    payload: Partial<FileData>;
};

export const { useDbUpdateListener, emitDbUpdate } = createEvent('db-update')<DBUpdateMessage>();
