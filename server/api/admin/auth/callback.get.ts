import { consumeNonce, consumeState, exchangeCodeForToken, verifyIdToken } from "~/server/utils/line-auth";
import { isAdmin, issueSession } from "~/server/utils/session";

export default defineEventHandler(async (event) => {
  const { code, state, error, error_description } = getQuery(event) as {
    code?: string;
    state?: string;
    error?: string;
    error_description?: string;
  };
  if (error) {
    throw createError({ statusCode: 401, statusMessage: `LINE login error: ${error_description || error}` });
  }
  if (!code || !state) {
    throw createError({ statusCode: 400, statusMessage: "missing code/state" });
  }
  if (!consumeState(event, state)) {
    throw createError({ statusCode: 401, statusMessage: "invalid state" });
  }
  const nonce = consumeNonce(event);
  const token = await exchangeCodeForToken(code);
  const claims = await verifyIdToken(token.id_token, nonce);
  if (!isAdmin(claims.sub)) {
    throw createError({ statusCode: 403, statusMessage: "not an authorized admin user" });
  }
  issueSession(event, { sub: claims.sub, name: claims.name });
  await sendRedirect(event, "/admin", 302);
});
