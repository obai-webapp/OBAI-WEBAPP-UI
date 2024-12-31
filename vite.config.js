import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import sass from 'sass';

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
            '@types': path.resolve('./src/types'),
            '@': path.resolve('./src')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
                api: 'modern'
            }
        }
    },
    plugins: [
        react({
            jsxRuntime: 'classic'
        })
    ],
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: true,
        assetsDir: 'assets'
    },
    server: {
        host: '0.0.0.0', // Allow access from your network
        port: 3000, // You can adjust this if needed
        open: true // Opens the app in a local browser by default
    }
});
