import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore - types not provided for Vite MDX rollup plugin
import mdx from '@mdx-js/rollup';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Support both Vercel environment variables and local .env files
    const geminiApiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), mdx()],
      define: {
        'process.env.API_KEY': JSON.stringify(geminiApiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey),
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiApiKey),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      css: {
        postcss: './postcss.config.js',
      },
      build: {
        // Performance optimizations
        target: 'esnext',
        minify: 'esbuild',
        cssMinify: true,
        sourcemap: false,
        rollupOptions: {
          input: {
            main: './index.html',
          },
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              'framer-motion': ['framer-motion'],
              'google-genai': ['@google/genai'],
            },
          },
        },
        chunkSizeWarningLimit: 1000,
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion'],
      },
    };
});
