import { clearAdminSession } from "~/server/utils/session";

export default defineEventHandler((event) => {
  clearAdminSession(event);
  return { ok: true };
});
