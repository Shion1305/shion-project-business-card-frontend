import crypto from "node:crypto";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { H3Event } from "h3";

const LINE_AUTHORIZE_URL = "https://access.line.me/oauth2/v2.1/authorize";
const LINE_TOKEN_URL = "https://api.line.me/oauth2/v2.1/token";
const LINE_ISSUER = "https://access.line.me";
const LINE_JWKS_URL = "https://api.line.me/oauth2/v2.1/certs";

const STATE_COOKIE = "line_oauth_state";
const NONCE_COOKIE = "line_oauth_nonce";

let jwksCache: ReturnType<typeof createRemoteJWKSet> | null = null;
function getJwks() {
  if (!jwksCache) jwksCache = createRemoteJWKSet(new URL(LINE_JWKS_URL));
  return jwksCache;
}

function lineConfig() {
  const cfg = useRuntimeConfig().line;
  if (!cfg.channelId || !cfg.channelSecret || !cfg.callbackUrl) {
    throw createError({ statusCode: 500, statusMessage: "LINE login not configured" });
  }
  return cfg;
}

export function buildAuthorizeUrl(event: H3Event): string {
  const cfg = lineConfig();
  const state = crypto.randomBytes(16).toString("hex");
  const nonce = crypto.randomBytes(16).toString("hex");
  const opts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 600,
  };
  setCookie(event, STATE_COOKIE, state, opts);
  setCookie(event, NONCE_COOKIE, nonce, opts);
  const params = new URLSearchParams({
    response_type: "code",
    client_id: cfg.channelId,
    redirect_uri: cfg.callbackUrl,
    state,
    scope: "openid profile",
    nonce,
  });
  return `${LINE_AUTHORIZE_URL}?${params.toString()}`;
}

export function consumeState(event: H3Event, state: string): boolean {
  const stored = getCookie(event, STATE_COOKIE);
  setCookie(event, STATE_COOKIE, "", { path: "/", maxAge: 0 });
  if (!stored || !state) return false;
  return stored === state;
}

export function consumeNonce(event: H3Event): string | null {
  const stored = getCookie(event, NONCE_COOKIE);
  setCookie(event, NONCE_COOKIE, "", { path: "/", maxAge: 0 });
  return stored || null;
}

interface TokenResponse {
  id_token: string;
  access_token: string;
}

export async function exchangeCodeForToken(code: string): Promise<TokenResponse> {
  const cfg = lineConfig();
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: cfg.callbackUrl,
    client_id: cfg.channelId,
    client_secret: cfg.channelSecret,
  });
  const res = await $fetch<TokenResponse>(LINE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  return res;
}

export interface LineIdTokenClaims {
  sub: string;
  name?: string;
  picture?: string;
  iss: string;
  aud: string;
  nonce?: string;
}

export async function verifyIdToken(idToken: string, expectedNonce: string | null): Promise<LineIdTokenClaims> {
  const cfg = lineConfig();
  const { payload } = await jwtVerify(idToken, getJwks(), {
    issuer: LINE_ISSUER,
    audience: cfg.channelId,
  });
  if (expectedNonce && payload.nonce !== expectedNonce) {
    throw createError({ statusCode: 401, statusMessage: "nonce mismatch" });
  }
  return payload as unknown as LineIdTokenClaims;
}
