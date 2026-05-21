// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define a `loader` and `schema` for each collection
const usage = defineCollection({
  loader: glob({ base: './src/content/usage', pattern: '**/*.{md,json}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    graph: z.array(z.object({
      nodes: z.array(z.object({
        id: z.string(),
        name: z.string(),
        group: z.number(),
      })),
      links: z.array(z.array(z.string())),
      viewGuide: z.boolean().optional(),
      colors: z.array(z.string()).optional(),
      width: z.union([z.number(), z.string()]).optional(),
      height: z.union([z.number(), z.string()]).optional(),
      repulsion: z.number().optional(),
      linkDistance: z.number().optional(),
      className: z.string().optional(),
      linkColor: z.string().optional(),
      linkWidth: z.number().optional(),
      linkHoverColor: z.string().optional(),
      linkHoverWidth: z.number().optional(),
      nodeHoverColor: z.string().optional(),
      nodeLabelColor: z.string().optional(),
      nodeLabelHoverColor: z.string().optional(),
      nodeLabelFontSize: z.number().optional(),
      nodeLabelShowOnHover: z.boolean().optional(),
      nodeLabelMinDegree: z.number().optional(),
      nodeLabelMinScale: z.number().optional(),
    })),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { usage };