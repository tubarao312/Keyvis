import { registerUser } from "@/lib/auth/auth";
import { UserRegisterSchema } from "@/lib/auth/types";


export default async function Page() {
    return (
        <div>
            <form action={
                async (formData) => {
                    "use server"; 
                    try {
                        const data = UserRegisterSchema.parse({
                            email: formData.get("email") as string,
                            password: formData.get("password") as string,
                        });

                        await registerUser(data);
                    } catch (error) {
                        console.error(error);
                    }              
                }
            }>
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