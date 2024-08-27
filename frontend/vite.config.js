import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Kicks Alb App',
        short_name: 'Kicks Alb',
        start_url: '/',
        display: 'fullscreen', // Fullscreen mode
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/', 
  server: {
    host: '0.0.0.0',
    port: 5173
  },
});
