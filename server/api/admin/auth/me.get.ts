import { readSession } from "~/server/utils/session";

export default defineEventHandler((event) => {
  const session = readSession(event);
  if (!session) return { authenticated: false as const };
  return { authenticated: true as const, sub: session.sub, name: session.name };
});
