// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://aschey.tech",
  integrations: [sitemap(), mdx(), preact({ compat: true, devtools: true })],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
    imagesConfig: { sizes: [320, 640, 1280], domains: [] },
  }),
});

