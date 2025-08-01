// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import db from '@astrojs/db';

import tailwindcss from '@tailwindcss/vite';

import auth from 'auth-astro';
import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
  integrations: [react(), db(), auth()],

  vite: {
    plugins: [tailwindcss()]
  },
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    maxDuration: 4,
    edgeMiddleware: true
  })
});