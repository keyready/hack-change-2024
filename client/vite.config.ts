import * as path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // https://vitejs.dev/config/

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, './src/') }],
    },
    define: {
        IS_DEV: JSON.stringify(true),
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://25.15.27.124:5000/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\//, ''),
            },
        },
    },
});
