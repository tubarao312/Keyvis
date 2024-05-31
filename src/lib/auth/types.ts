import { z } from "zod";

// Define UserLogin and UserRegister schemas
export const UserRegisterSchema = z.object({
    email: z.string().email(),
    password: z
        .string({
            required_error: "required field",
            invalid_type_error: "Password must be a string",
        })
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password is too long"),
});

export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export interface UserLogin extends z.infer<typeof UserLoginSchema> { }
export interface UserRegister extends z.infer<typeof UserRegisterSchema> { }