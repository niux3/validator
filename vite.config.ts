import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
    },
    build: {
        outDir: 'static/js',
        emptyOutDir: true,
        lib: {
            entry: './lib/main.ts',
            name: 'Validator',
            fileName: 'validator',
        },
        rollupOptions: {
            input : './src/index.ts',
            output: {
                entryFileNames: 'validator.min.js',
            },
        },

    },
})
