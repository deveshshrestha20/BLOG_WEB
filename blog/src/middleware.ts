import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('auth');
  let isLoggedIn = false;

  try {
    if (auth?.value) {
      const parsedAuth = JSON.parse(auth.value);
      isLoggedIn = parsedAuth.isLoggedIn && parsedAuth.user;
    }
  } catch (error) {
    console.error('Error parsing auth cookie:', error);
  }

  const isBlogsPage = request.nextUrl.pathname.startsWith('/blogs');

  // Only redirect to login if trying to access protected routes (blogs)
  if (!isLoggedIn && isBlogsPage) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // No redirects for auth pages (login and signup) when logged in
  // This allows users to access these pages even when logged in

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/blogs/:path*', '/login', '/signup'],
}; 