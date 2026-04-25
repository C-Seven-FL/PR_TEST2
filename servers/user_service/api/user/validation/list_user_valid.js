import { z } from "zod";

export const listUserSchema = z.object({

    id: z.string().optional()

});

