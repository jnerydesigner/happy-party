import { z } from 'zod';

export const DeletePresentOnListDTO = z.object({
  listPresentId: z.string(),
  presentId: z.string(),
});
