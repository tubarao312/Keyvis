import { auth } from "@/auth"

const authRoutes = ["/login", "/register"];

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
    const isApiAuthRouter = req.nextUrl.pathname.startsWith("/api/auth");

    // If user is logged in or is trying to access an auth route, allow access
    if (isApiAuthRouter || isAuthRoute || isLoggedIn) {
        return;
    }

    // Redirect to login page if user is not logged in
    return Response.redirect(new URL("/login", req.nextUrl));
});


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
