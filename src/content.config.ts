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
    image: z.string(),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { usage };