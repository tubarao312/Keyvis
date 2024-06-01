"use client";

import { useFormState } from "react-dom";

import { login } from "@/lib/auth/user";

const initialState = {
    message: '',
    errors: {
        email: '',
        password: '',
        credentials: '',
        unknown: '',
    },
} 

export default function Page() {
    const [formState, formAction] = useFormState(login, initialState);

    return (
        <div className="flex items-center justify-center">
            <form 
                className="flex flex-col w-96 space-y-4 items-center rounded-lg p-5 shadow-xl ring-1 ring-inset ring-black/20 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-zinc-300/10 dark:bg-zinc-600/10 dark:ring-white/10 dark:hover:bg-zinc-600/[0.12] dark:hover:ring-white/20" 
                action={formAction}
            >
                <label
                    className="flex flex-col w-full text-sm"
                >
                    Email
                    <input 
                        className="block w-full rounded-md border-0 bg-transparent px-3 py-1.5 text-zinc-900 shadow-sm outline-none ring-1 ring-inset transition-all duration-75 placeholder:text-zinc-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:text-zinc-200 dark:ring-white/10"
                        type="text" 
                        name="email"
                        placeholder="Email" 
                    />
                </label>
                
                <label
                    className="flex flex-col w-full text-sm"
                >
                    Password
                    <input 
                    className="block w-full rounded-md border-0 bg-transparent px-3 py-1.5 text-zinc-900 shadow-sm outline-none ring-1 ring-inset transition-all duration-75 placeholder:text-zinc-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:text-zinc-200 dark:ring-white/10"
                        type="password" 
                        name="password" 
                        placeholder="Password"
                    />
                </label>
                <button 
                    className="flex w-full flex-row rounded-md px-3 py-1.5 justify-center text-sm text-emerald-600 ring-1 ring-inset transition-all duration-150 ease-in-out  hover:ring-emerald-600/20  dark:bg-emerald-600/10 dark:text-emerald-400 dark:ring-zinc-400/10 dark:hover:bg-emerald-600/20 dark:hover:ring-emerald-600/50"
                    type="submit"
                >
                    Log In
                </button>
            </form>
        </div>
    )
}