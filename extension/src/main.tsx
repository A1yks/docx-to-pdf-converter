import 'simplebar-react/dist/simplebar.min.css';
import '@/styles/global.scss';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initDB } from 'react-indexed-db-hook';
import { StrictMode } from 'react';

initDB({
    name: 'upload',
    version: 1,
    objectStoresMeta: [
        {
            store: 'files',
            storeConfig: { keyPath: 'id', autoIncrement: false },
            storeSchema: [
                { name: 'id', keypath: 'id', options: { unique: true } },
                { name: 'name', keypath: 'name', options: { unique: false } },
                { name: 'size', keypath: 'size', options: { unique: false } },
                { name: 'status', keypath: 'status', options: { unique: false } },
                { name: 'progress', keypath: 'progress', options: { unique: false } },
                { name: 'error', keypath: 'error', options: { unique: false } },
                { name: 'date', keypath: 'date', options: { unique: false } },
                { name: 'blob', keypath: 'blob', options: { unique: false } },
            ],
        },
    ],
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
