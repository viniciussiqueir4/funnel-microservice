import * as z from 'zod'; 

export const createFunnelMessageValidation = z.object({
    funnelId: z.string().optional(),
    message: z.string(),
    minutesAfterPrevious: z.number(),
    filenames:  z.array(z.string()),
    messageButtons: z.array(z.string()),
}).array(); 
