import { z } from 'zod';

export const CreatePresentOnListDTO = z.object({
  presentHotId: z.string(),
  userId: z.string(),
});

export type CreatePresentOnListZodDTO = z.infer<typeof CreatePresentOnListDTO>;
