'use server';
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { UserLogin, userLoginSchema, userRegisterSchema } from "@/lib/auth/types";

function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}

export const registerUser = async (prevState: any, formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const data = userRegisterSchema.safeParse({
        email: email,
        password: password,
    });

    if (!data.success) {
        return {
            message: 'validation error',
            errors: data.error.flatten().fieldErrors,
        };
    }

    // Verify if the user already exists
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (user) {
        return {
            message: 'user already exists',
            errors: {
                email: 'user already exists',
                password: '',
            },
        };
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    return {
        message: 'success',
        errors: {},
    };
}

export const getUser = async (data: UserLogin) => {
    const { email, password } = data;

    // Verify if the user exists
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Verify the password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error("Invalid password");
    }

    return user;
}

const defaultValues = {
    email: '',
    password: '',
}

export async function login(prevState: any, formData: FormData) {
    try {
        const email = formData.get('email');
        const password = formData.get('password');

        const validatedFields = userLoginSchema.safeParse({
            email: email,
            password: password,
        });

        if (!validatedFields.success) {
            return {
                message: 'validation error',
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        await signIn('credentials', {
            redirectTo: '/',
            email: email,
            password: password,
        });

        return {
            message: 'success',
            errors: {},
        };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'credentials error',
                        errors: {
                            ...defaultValues,
                            credentials: 'incorrect email or password',
                        },
                    };
                default:
                    return {
                        message: 'unknown error',
                        errors: {
                            ...defaultValues,
                            unknown: 'unknown error',
                        },
                    };
            }
        }
        throw error;
    }
}

export async function logout() {
    await signOut();
}