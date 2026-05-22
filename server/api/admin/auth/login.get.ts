import { buildAuthorizeUrl } from "~/server/utils/line-auth";

export default defineEventHandler(async (event) => {
  const url = buildAuthorizeUrl(event);
  await sendRedirect(event, url, 302);
});
