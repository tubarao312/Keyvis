import { z } from "zod";

// Define UserLogin and UserRegister schemas
export const userRegisterSchema = z.object({
    email: z.string().email(),
    password: z
        .string({
            required_error: "required field",
            invalid_type_error: "Password must be a string",
        })
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password is too long"),
});

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export interface UserLogin extends z.infer<typeof userLoginSchema> { }
export interface UserRegister extends z.infer<typeof userRegisterSchema> { }