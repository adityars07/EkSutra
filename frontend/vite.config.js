import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendTarget = process.env.API_PROXY_TARGET || 'http://127.0.0.1:8080' //replacing the hardcoded targets for docker to know when to 
//send request to container and when to the actual pc itself

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            if (err.code === 'ECONNREFUSED' && !res.headersSent) {
              res.writeHead(503, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Backend service unavailable (offline)' }));
            }
          });
        },
      },
      '/actuator': {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            if (err.code === 'ECONNREFUSED' && !res.headersSent) {
              res.writeHead(503, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ status: 'DOWN', error: 'Backend service unavailable (offline)' }));
            }
          });
        },
      },
    },
  },
})
