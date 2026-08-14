import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://maz.agency",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes("/super-ninja-call") &&
        !page.includes("/super-ninja-proposal"),
    }),
  ],
  image: {
    responsiveStyles: true,
  },
});
