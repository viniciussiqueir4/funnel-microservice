import * as z from 'zod';

enum Behavior {
  FINISH = "FINISH",
  REDIRECT = "REDIRECT",
}

export const createFunnelValidation = z.object({
  name: z.string(),
  botToken: z.string(),
  behavior: z.nativeEnum(Behavior),
  estableshimentId: z.number().nonnegative({ message: 'ESTABLESHIMENT_ID_NON_NEGATIVE'}).int({message: 'ESTABLESHIMENT_ID_MUST_BE_INTEGER'}), 
  departmentToRedirect: z.number().optional(),
}).strict();
