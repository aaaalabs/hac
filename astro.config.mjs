// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://hac.kinn.at',
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});