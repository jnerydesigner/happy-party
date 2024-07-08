import { z } from 'zod';

export const UpdatePresentSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  urlSailers: z.string().optional(),
  price: z.number().nonnegative().optional(),
});

export type UpdatePresentDTO = z.infer<typeof UpdatePresentSchema>;
