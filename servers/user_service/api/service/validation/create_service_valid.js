import { z } from "zod";

export const createServiceSchema = z.object({

    userID: z.string(),
    categoryID: z.string(),
    name: z.string().min(1).max(255),
    description: z.string().max(4096).optional(),
    address: z.string().min(1),
    working_days: z.array(z.string()),
    hour_start: z.string(),
    hour_end: z.string(),
    slot_duration: z.string(),

});