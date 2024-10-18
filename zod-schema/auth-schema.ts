import { z } from "zod";

export const CredentialsLoginSchema = z.object({
    email: z.string().min(4),
    password:z.string().min(6).max(32)
})
export const CredentialsRegisterSchema = z.object({
    email: z.string().min(4),
    password:z.string().min(6).max(32),
    name:z.string().min(3).max(64),
    displayName:z.string().min(3).max(86)
})
export const UpdateProfileSchema = z.object({
    name:z.string().min(3).max(64),
    displayName:z.string().min(3).max(86)
})
