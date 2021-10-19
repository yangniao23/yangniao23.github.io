import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    abstract: z.string().optional().default(""),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    ogp: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
