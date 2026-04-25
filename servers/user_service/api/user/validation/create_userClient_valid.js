import { z } from "zod";

export const createClientSchema = z.object({

    password: z.string(),
    name: z.string(),
    gender: z.string(),
    mail: z.string(),
    phone_number: z.string().optional(),
    birthdate: z.string(),
    address: z.string().optional(),
    user_type: z.string(),

});