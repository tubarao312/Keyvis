import { UserLogin, UserRegister } from "@/lib/auth/types";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}

export const registerUser = async (data: UserRegister) => {
    const { password, email } = data;

    // Verify if the user already exists
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (user) {
        throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    return newUser;
}