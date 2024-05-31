import { authConfig } from '@/auth.config';
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"

import prisma from "@/lib/prisma"
import { loginUser } from "@/lib/auth/auth"
import { UserLoginSchema } from "@/lib/auth/types"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",

            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                // Safely parse all the user credentials
                const data = await UserLoginSchema.parseAsync(credentials);

                // Login the user
                const user = await loginUser(data);

                return user ?? null;
            },
        }),
    ],
})