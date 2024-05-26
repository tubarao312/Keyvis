import { signIn } from "@/auth"

export default async function Page() {
    return (
        <div>
            <form action={
                async (formData: FormData) => {
                    "use server";
                    const username = formData.get('username') as string;
                    const password = formData.get('password') as string;
                    
                    await signIn();
                }
            }>
                <label>
                    Username:
                    <input type="text" name="username" />
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