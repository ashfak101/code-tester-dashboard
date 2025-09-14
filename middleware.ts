import { NextRequest, NextResponse } from "next/server"

// Routes that don't require authentication (whitelist approach)
const publicRoutes = ["/login", "/api/auth"]

function isAuthenticated (req: NextRequest) {
    // NextAuth session cookie names
    const sessionToken =
        req.cookies.get("next-auth.session-token")?.value ||
        req.cookies.get("__Secure-next-auth.session-token")?.value
    return !!sessionToken
}

export async function middleware (req: NextRequest) {
    const authenticated = isAuthenticated(req)
    const path = req.nextUrl.pathname

    // Allow public routes and API routes
    const isPublicRoute = publicRoutes.some(route => path.startsWith(route))

    // Allow public assets
    const isPublicFile = /\.(jpg|jpeg|png|gif|svg|ico|css|js)$/.test(path) ||
        path.startsWith("/_next") ||
        path.startsWith("/favicon.ico")

    // Redirect authenticated users away from login page
    if (authenticated && path === "/login") {
        return NextResponse.redirect(new URL("/", req.url))
    }

    // Allow access to public routes and assets regardless of authentication
    if (isPublicFile || isPublicRoute) {
        return NextResponse.next()
    }

    // Require authentication for all other routes
    if (!authenticated) {
        return NextResponse.redirect(new URL(`/login?callbackUrl=${ encodeURIComponent(path) }`, req.url))
    }

    return NextResponse.next()
}

// Configure the matcher for routes that should run the middleware
export const config = {
    matcher: [
        // Match all routes except static files and api routes that should bypass auth
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
}
