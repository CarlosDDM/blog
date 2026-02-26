import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/login/manage-login';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === '/admin/login';
  const isSignupPage = pathname === '/admin/signup';
  const isGetMethod = request.method === 'GET';

  const shouldBeAuthenticated = !isSignupPage && !isLoginPage;
  const shouldRedirect = shouldBeAuthenticated && isGetMethod;

  if (!shouldRedirect) {
    return NextResponse.next();
  }

  const jwtSession = request.cookies.get(
    process.env.LOGIN_COOKIE_NAME || 'loginSession',
  )?.value;

  const isAuthenticated = await verifyJWT(jwtSession);

  if (!isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
