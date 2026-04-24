import { z } from "zod";

export const updateServiceSchema = z.object({
    
    userID: z.string().optional(),
    categoryID: z.string().optional(),
    name: z.string().min(1).max(255).optional(),
    description: z.string().max(4096).optional(),
    address: z.string().min(1).optional(),
    working_days: z.array(z.string()).optional(),
    hour_start: z.string().optional(),
    hour_end: z.string().optional(),
    slot_duration: z.string().optional(),
    banned_users: z.array(z.string()).optional(),
    active: z.boolean().optional(),
    blocked: z.boolean().optional(),

});