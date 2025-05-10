import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // โหลด .env ตาม mode (development/production)

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      strictPort: true,
      port: Number(env.VITE_PORTS), // ✅ ใช้ env ที่โหลดมา
      proxy: {
        '/api': {
          target: env.VITE_URL_ENDPOINT_API,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
