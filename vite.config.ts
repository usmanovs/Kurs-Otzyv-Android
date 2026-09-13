import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'favicon-32x32.png', 'favicon-16x16.png', 'apple-touch-icon.png'],
        manifest: {
          name: 'Kursotzyv Mobile',
          short_name: 'Kursotzyv',
          description: 'Кыргызстандагы онлайн курстар жана мугалимдер жөнүндө чынчыл сын-пикирлер.',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#020617',
          theme_color: '#4f46e5',
          orientation: 'portrait',
          icons: [
            {src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any'},
            {src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any'},
            {src: '/maskable-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable'},
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
