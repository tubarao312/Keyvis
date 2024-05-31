import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
        newUser: "/register",
    },

    callbacks: {
        async authorized({ auth }) {
            // If the user is authorized, return the user object
            return !!auth?.user;
        },
    },
    providers: [],
} satisfies NextAuthConfig;