import { useFormState } from "react-dom";

import { login } from "@/lib/auth/auth";

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
        <div>
            <form action={formAction}>
                <label>
                    Email:
                    <input type="text" name="email" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}