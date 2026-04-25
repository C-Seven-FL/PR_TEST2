import { z } from "zod";

export const updateUserSchema = z.object({
    
    password: z.string().optional(),
    name: z.string().optional(),
    gender: z.string().optional(),
    mail: z.string().optional(),
    phone_number: z.string().optional().optional(),
    birthdate: z.string().optional(),
    address: z.string().optional().optional(),
    notifications: z.array(z.object()).optional(),
    notification_turn: z.boolean().optional(),
    blocked: z.boolean().optional()

});