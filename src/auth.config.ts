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

        jwt({ token, user }) {
            // Add the user id to the token
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        session({ session, token }) {
            // Add the user id to the session
            session.user.id = token.id as string;
            return session;
        },
    },
    providers: [],
} satisfies NextAuthConfig;