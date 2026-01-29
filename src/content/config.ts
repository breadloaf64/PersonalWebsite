import { defineCollection, z } from "astro:content";

const feed = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    url: z.string().url(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    external: z.boolean().default(true)
  }),
});

export const collections = { feed };
