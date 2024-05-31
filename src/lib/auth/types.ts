import { z } from "zod";

// Define UserLogin and UserRegister schemas
export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const UserRegisterSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export interface UserLogin extends z.infer<typeof UserLoginSchema> { }
export interface UserRegister extends z.infer<typeof UserRegisterSchema> { }