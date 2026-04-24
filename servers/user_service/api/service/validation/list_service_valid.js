import { z } from "zod";

export const listServiceSchema = z.object({

    id: z.string().optional()

});

