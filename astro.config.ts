import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
const gruvboxMaterialDark = JSON.parse(
  readFileSync(
    fileURLToPath(
      new URL("./themes/gruvbox-material-dark.json", import.meta.url)
    ),
    "utf-8"
  )
);

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  output: "static",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: gruvboxMaterialDark, dark: gruvboxMaterialDark },
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
  experimental: {
    contentLayer: true,
  },
});
