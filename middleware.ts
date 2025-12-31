import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to all public routes (most of the site)
        if (req.nextUrl.pathname.startsWith('/login') ||
            req.nextUrl.pathname.startsWith('/register') ||
            req.nextUrl.pathname.startsWith('/api/auth') ||
            req.nextUrl.pathname === '/' ||
            req.nextUrl.pathname.startsWith('/products') ||
            req.nextUrl.pathname.startsWith('/cart') ||
            req.nextUrl.pathname.startsWith('/_next') ||
            req.nextUrl.pathname.startsWith('/api/webhook') ||
            req.nextUrl.pathname.startsWith('/api/products') ||
            req.nextUrl.pathname.startsWith('/api/stripe')) {
          return true;
        }

        // Require authentication only for account/admin routes
        const protectedRoutes = ['/account', '/admin', '/checkout'];
        if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
          return !!token; // Just need to be logged in
        }

        // Allow access to everything else
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
