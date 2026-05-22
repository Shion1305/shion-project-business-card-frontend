import crypto from "node:crypto";
import type { H3Event } from "h3";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 8;

export interface AdminSession {
  sub: string;
  name?: string;
  iat: number;
  exp: number;
}

function getSecret(): string {
  const secret = useRuntimeConfig().sessionSecret;
  if (!secret) {
    throw createError({ statusCode: 500, statusMessage: "session secret not configured" });
  }
  return secret;
}

function base64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function sign(payload: string, secret: string): string {
  return base64url(crypto.createHmac("sha256", secret).update(payload).digest());
}

function timingSafeEqualStr(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export function issueSession(event: H3Event, payload: { sub: string; name?: string }) {
  const now = Math.floor(Date.now() / 1000);
  const session: AdminSession = {
    sub: payload.sub,
    name: payload.name,
    iat: now,
    exp: now + MAX_AGE_SECONDS,
  };
  const body = base64url(Buffer.from(JSON.stringify(session)));
  const sig = sign(body, getSecret());
  const token = `${body}.${sig}`;
  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export function readSession(event: H3Event): AdminSession | null {
  const token = getCookie(event, COOKIE_NAME);
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body, getSecret());
  if (!timingSafeEqualStr(sig, expected)) return null;
  try {
    const session = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as AdminSession;
    if (session.exp < Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

export function clearAdminSession(event: H3Event) {
  setCookie(event, COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function isAdmin(sub: string): boolean {
  const raw = useRuntimeConfig().line.adminUserIds || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .includes(sub);
}
