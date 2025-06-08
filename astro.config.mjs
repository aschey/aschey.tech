// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";
import process from "node:process";
import { glob } from "glob";
import * as path from "node:path";
import { spawnSync } from "node:child_process";
import { transformerNotationDiff } from "@shikijs/transformers";
import remarkGithubAlerts from "remark-github-alerts";

const { ENABLE_IMAGE_SERVICE } = loadEnv(
  process.env.NODE_ENV || "",
  process.cwd(),
  "",
);
// https://astro.build/config
export default defineConfig({
  site: "https://aschey.tech",
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "kanagawa-wave",
      transformers: [transformerNotationDiff()],
    },
    remarkPlugins: [remarkGithubAlerts],
  },
  integrations: [
    sitemap(),
    mdx(),
    preact({ compat: true, devtools: true }),
    {
      name: "build-d2",
      hooks: {
        "astro:server:setup": async ({ server }) => {
          if (server.config.mode !== "development") {
            return;
          }

          const buildDiagram = (/** @type {string} */ file) => {
            const svgName = path.basename(file).replace(".d2", ".svg");
            spawnSync("d2", [file, `./src/assets/${svgName}`], {
              stdio: "inherit",
            });
          };

          const d2Files = await glob("**/*.d2", { ignore: "node_modules/**" });
          for (let file of d2Files) {
            server.watcher.add(file);
            buildDiagram(file);
          }

          server.watcher.on("change", (file) => {
            if (file.endsWith(".d2")) {
              buildDiagram(file);
            }
          });
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel({
    imageService: !!ENABLE_IMAGE_SERVICE,
    imagesConfig: { sizes: [320, 640, 960, 1280], domains: [] },
  }),
});
