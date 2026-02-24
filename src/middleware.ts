import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the user is trying to access the admin area
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip the login page itself to avoid infinite redirects
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for the Appwrite session cookie
    // The cookie name might vary depending on your Appwrite setup, 
    // usually it's something like 'a_session_' followed by the project ID
    const hasSession = request.cookies.getAll().some(cookie => cookie.name.startsWith('a_session_'));

    if (!hasSession) {
      // Redirect to login page if no session cookie is found
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};
