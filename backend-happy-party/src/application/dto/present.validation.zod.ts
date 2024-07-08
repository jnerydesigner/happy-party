import { z } from 'zod';

export const CreatePresentSchema = z.object({
  name: z.string(),
  image: z.string().optional(),
  urlSailers: z.string().optional(),
  price: z.number().nonnegative(),
});

export const UpdatePresentSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  urlSailers: z.string().optional(),
  price: z.number().nonnegative().optional(),
});

export type UpdatePresentZodDTO = z.infer<typeof UpdatePresentSchema>;
export type CreatePresentZodDTO = z.infer<typeof CreatePresentSchema>;
