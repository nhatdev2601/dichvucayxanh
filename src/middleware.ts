import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NOTE: Appwrite Web SDK stores sessions in localStorage (not HTTP cookies),
// so server-side middleware cannot verify the session.
// Authentication is handled client-side in src/app/admin/layout.tsx instead.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
