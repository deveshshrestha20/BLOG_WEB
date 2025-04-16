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
  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';

  // Redirect to login if trying to access protected routes (blogs) while not logged in
  if (!isLoggedIn && isBlogsPage) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to blogs page if trying to access auth pages while already logged in
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/blogs', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/blogs/:path*', '/login', '/signup'],
}; 