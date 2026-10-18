// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://satyarajawasthi.com.np',
  integrations: [mdx()],
  // Old URLs keep working after the /blogs -> /writing and /activities -> /log rename.
  redirects: {
    '/blogs': '/writing',
    '/blogs/[slug]': '/writing/[slug]',
    '/activities': '/log',
    '/cv': '/about#cv',
  },
  markdown: {
    // Keep quotes and dashes exactly as written instead of converting them to curly quotes and em dashes.
    smartypants: false,
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: 'light',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
