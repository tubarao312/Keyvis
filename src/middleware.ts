import { auth } from "@/auth"
import { NextResponse } from "next/server"

// export { auth as middleware } from "@/auth"

export default auth((req) => {

    // If the user is not authenticated take them to the login page
    if (!req.auth) {
        // Get the base url
        const url = new URL(req.url)

        // Redirect to the login page
        const fullUrl = `${url.protocol}//${url.host}/login`
        return NextResponse.redirect(fullUrl)
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}