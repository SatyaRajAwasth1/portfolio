import { defineCollection, z } from "astro:content";
import { FORMAT_IDS, STATUS_IDS } from "./lib/taxonomy";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Dates are "YYYY-MM-DD".
    date: z.string(),
    updated: z.string().optional(),
    // The post type. See src/lib/taxonomy.ts.
    format: z.enum(FORMAT_IDS),
    // How settled the thinking is. Shown on research-style posts.
    status: z.enum(STATUS_IDS).optional(),
    tags: z.array(z.string()),
    // Drafts render in `yarn dev` but are left out of the production build.
    draft: z.boolean().optional(),
    // Featured posts are listed first on the home page.
    featured: z.boolean().optional(),
    coverImage: z.string().optional(),
    showTOC: z.boolean().optional(),
    series: z
      .object({
        id: z.string(),
        title: z.string(),
        part: z.number(),
      })
      .optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    area: z.string(),
    // "research" projects also appear on /research.
    type: z.enum(["engineering", "research", "open-source"]),
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        repo: z.string().url().optional(),
        paper: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .default({}),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  blog,
  projects,
};
