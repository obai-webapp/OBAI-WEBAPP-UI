import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@components': path.resolve('./src/components'),
            '@utils': path.resolve('./src/utils'),
            '@constants': path.resolve('./src/constants'),
            '@images': path.resolve('./src/assets/images'),
            '@icons': path.resolve('./src/assets/icons'),
            '@logos': path.resolve('./src/assets/logos'),
            '@pages': path.resolve('./src/pages'),
            '@layout': path.resolve('./src/layout'),
            '@redux': path.resolve('./src/redux'),
        }
    },
    plugins: [
        react({
            jsxRuntime: 'classic'
        })
    ],
    build: {
        outDir: 'dist', // This is what Render expects for a static site.
        sourcemap: false,
        minify: true,
        assetsDir: 'assets', // Ensure assets are stored correctly.
    },
    server: {
        port: 3000,
        open: true
    }
});
