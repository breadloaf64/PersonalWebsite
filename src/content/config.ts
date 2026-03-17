import { defineCollection, reference, z } from "astro:content";

const feed = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    pageReference: reference("pages").optional(), // if we link to a page on the website
    url: z.string().url().optional(), // if we link to an external site
    image: z.string().optional(),
    categories: z.array(z.string()).optional(),
    type: z.enum(["blog", "link"]), // blog has body content to be automatically turned into a page. Link should point to an existing page
  }),
});

export const collections = { feed };
