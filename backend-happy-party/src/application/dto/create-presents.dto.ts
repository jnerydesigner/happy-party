import { z } from 'zod';

const CreatePresentDTO = z.object({
  listPresentsId: z.string(),
  presentHotId: z.string(),
});

export type CreatePresentDTO = z.infer<typeof CreatePresentDTO>;
