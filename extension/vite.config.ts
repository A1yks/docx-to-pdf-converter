import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tsconfigPaths(), react(), crx({ manifest }), svgr()],
    server: {
        port: 3000,
        host: '127.0.0.1',
    },
});
