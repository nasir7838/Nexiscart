import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define public paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/order-status',
  '/api/auth',
  '/_next',
  '/favicon.ico',
  '/public',
  '/order-status/:path*',
  '/account/orders/:path*',  // Allow access to order details
];

// Paths that should be accessible only to unauthenticated users
const authPaths = ['/login', '/register'];

// Paths that require authentication (excluding orders which is now public)
const protectedPaths = ['/account', '/checkout'].filter(
  path => !path.startsWith('/account/orders')
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  
  // Set request headers for API routes
  requestHeaders.set('x-pathname', pathname);

  try {
    // Skip middleware for public paths
    if (publicPaths.some(path => pathname === path || pathname.startsWith(path))) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // Get the token from the request
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Handle unauthenticated access to protected routes
    if (!token && protectedPaths.some(path => pathname.startsWith(path))) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Handle authenticated access to auth pages
    if (token && authPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Add user role to request headers for API routes
    if (token?.role) {
      requestHeaders.set('x-user-role', token.role);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Middleware error:', error);
    
    // Redirect to error page or login on error
    const errorUrl = new URL('/error', request.url);
    errorUrl.searchParams.set('message', 'An error occurred');
    return NextResponse.redirect(errorUrl);
  }
}

// Configure which paths should be processed by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - handled by NextAuth
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - static files with extensions
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public/|.*\..*).*)',
  ],
};
