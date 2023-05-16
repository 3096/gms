import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().nonempty().max(64),
  releaseDate: z.date().optional(),
  website: z.string().url().max(255).optional(),
  description: z.string().optional(),
  franchise: z.string().max(64).optional(),
  platform: z.string().max(64).optional(),
  genre: z.string().max(64).optional(),
  publisher: z.string().max(64).optional(),
  developer: z.string().max(64).optional()
});
