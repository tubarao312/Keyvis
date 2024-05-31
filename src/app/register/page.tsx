"use client";

import { registerUser } from "@/lib/auth/user";
import { useFormState } from "react-dom";

const initialState = {
    message: "",
    errors: {
        email: "",
        password: "",
        credentials: "",
        unknown: "",
    },
};

export default function Page() {
    const [state, formAction] = useFormState(registerUser, initialState);

    return (
        <div>
            <form action={formAction}>
                <label>
                    Email:
                    <input required type="text" name="email" />
                </label>
                {state.errors.email && <p>{state.errors.email}</p>}
                <label>
                    Password:
                    <input required type="password" name="password" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}