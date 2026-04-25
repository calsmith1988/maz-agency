import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    tagline: z.string(),
    summary: z.string(),
    region: z.string().optional(),
    category: z.string().optional(),
    heroMetrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .max(3),
    cardImage: z.string().optional(),
    featured: z.boolean().default(true),
    order: z.number().default(99),
  }),
});

export const collections = {
  "case-studies": caseStudies,
};
