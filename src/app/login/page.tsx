import { signIn } from "@/auth"

export default async function Page() {
    return (
        <div>
            <form action={
                async (formData) => {
                    "use server"; 
                    try {
                        await signIn("credentials", formData);
                    } catch (error) {
                        console.error(error);
                    }              
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