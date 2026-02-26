import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpStr = process.env.LOGIN_EXPIRATION_STRING || '1d';
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';

type JWTUserPayload = {
  username: string;
  expiresAt: Date;
};

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = await signJWT({ username, expiresAt });
  const cokkieStore = await cookies();
  cokkieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteLoginSession() {
  const cokkieStore = await cookies();
  cokkieStore.set(loginCookieName, '', { expires: new Date(0) });
  cokkieStore.delete(loginCookieName);
}

export async function getLoginSession() {
  const cokkieStore = await cookies();
  const jwt = cokkieStore.get(loginCookieName)?.value;

  if (!jwt) return false;

  return await verifyJWT(jwt);
}

export async function requireLoginSessionOrRedirect() {
  const isAuthenticated = await getLoginSession();

  if (!isAuthenticated) {
    return redirect('/admin/login');
  }
}

export async function signJWT(jwtPayload: JWTUserPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodedKey);
}

export async function verifyJWT(jwt: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('JWT verification failed');
    return false;
  }
}
