// import { auth } from "@/auth"

export { auth as middleware } from "@/auth"

// export default auth((req) => {

//     // If the user is not authenticated take them to the login page
//     if (!req.auth) {
//         // Get the base url
//         const url = new URL(req.url)

//         // Redirect to the login page
//         const fullUrl = `${url.protocol}//${url.host}/login`
//         return Response.redirect(fullUrl, 302)
//     }
// })

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
// }