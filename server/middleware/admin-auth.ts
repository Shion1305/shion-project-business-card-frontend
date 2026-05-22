import { isAdmin, readSession } from "~/server/utils/session";

const PROTECTED_PREFIX = "/api/admin/";
const PUBLIC_SUBPATHS = ["auth/login", "auth/callback", "auth/me", "auth/logout"];

export default defineEventHandler((event) => {
  const url = event.node.req.url || "";
  if (!url.startsWith(PROTECTED_PREFIX)) return;
  const sub = url.slice(PROTECTED_PREFIX.length).split("?")[0];
  if (PUBLIC_SUBPATHS.some((p) => sub === p || sub.startsWith(`${p}/`) || sub.startsWith(`${p}?`))) {
    return;
  }
  const session = readSession(event);
  if (!session || !isAdmin(session.sub)) {
    throw createError({ statusCode: 401, statusMessage: "unauthorized" });
  }
});
