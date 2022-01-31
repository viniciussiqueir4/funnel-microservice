import * as z from 'zod';

enum Behavior {
  FINISH = "FINISH",
  REDIRECT = "REDIRECT",
}

export const updateFunnelValidation = z.object({
  id: z.string(), 
  name: z.string(),
  botToken: z.string(),
  behavior: z.nativeEnum(Behavior),
  estableshimentId: z.number().nonnegative({ message: 'ESTABLESHIMENT_ID_NON_NEGATIVE'}).int({message: 'ESTABLESHIMENT_ID_MUST_BE_INTEGER'}), 
  departmentToRedirect: z.number().optional(),
  // isActive: z.boolean().optional(),
}).strict();
