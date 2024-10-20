import { z } from "zod";

export const EditNameSchema = z.object({
    name: z.string().min(4).max(64),
    displayName: z.string().min(4).max(64),

})
export const EditEmailSchema = z.object({
    email: z.string().min(4).max(64),

})