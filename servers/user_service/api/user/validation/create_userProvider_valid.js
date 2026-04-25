import { z } from "zod";

export const createProviderSchema = z.object({

    password: z.string(),
    name: z.string(),
    gender: z.string(),
    mail: z.string(),
    phone_number: z.string().optional(),
    birthdate: z.string(),
    address: z.string().optional(),
    user_type: z.string(),

    categoryID: z.string(),
    company_name: z.string().min(1).max(255),
    description: z.string().max(4096).optional(),
    address: z.string().min(1),
    working_days: z.array(z.string()),
    hour_start: z.string(),
    hour_end: z.string(),
    slot_duration: z.string(),

});