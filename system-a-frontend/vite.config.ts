import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const backendTarget = process.env.API_PROXY_TARGET || 'http://localhost:8081';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
      },
    },
  },
});

