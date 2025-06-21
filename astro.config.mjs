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
import { readFileSync } from "node:fs";
import { transformerNotationDiff } from "@shikijs/transformers";
import remarkGithubAlerts from "remark-github-alerts";
import remarkToc from "remark-toc";
import sharp from "sharp";

const { ENABLE_IMAGE_SERVICE } = loadEnv(
  process.env.NODE_ENV || "",
  process.cwd(),
  "",
);

const kanagawaWave = JSON.parse(readFileSync("kanagawa-wave.json", "utf8"));

// https://astro.build/config
export default defineConfig({
  site: "https://www.aschey.tech",
  output: "static",
  markdown: {
    shikiConfig: {
      theme: kanagawaWave,
      transformers: [transformerNotationDiff()],
    },
    remarkPlugins: [remarkGithubAlerts, remarkToc],
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

          const buildDiagram = async (/** @type {string} */ file) => {
            const svgName = path.basename(file).replace(".d2", ".svg");
            const webpName = path.basename(file).replace(".d2", ".webp");
            spawnSync("d2", [file, `./src/assets/${svgName}`], {
              stdio: "inherit",
            });
            const svgData = readFileSync(`src/assets/${svgName}`);
            await sharp(svgData).toFile(`src/assets/${webpName}`);
          };

          const d2Files = await glob("**/*.d2", { ignore: "node_modules/**" });
          for (let file of d2Files) {
            server.watcher.add(file);
            await buildDiagram(file);
          }

          server.watcher.on("change", async (file) => {
            if (file.endsWith(".d2")) {
              await buildDiagram(file);
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
