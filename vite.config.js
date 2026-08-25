import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // MUST be '/' , not './'. With relative asset paths, a prerendered page at
  // /team/joan-claire-kabikuru/index.html would resolve ./assets/app.js to
  // /team/joan-claire-kabikuru/assets/app.js and 404.
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
});