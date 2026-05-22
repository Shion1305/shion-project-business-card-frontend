import admin from "~/server/pkg/firebase-admin";

const db = admin.firestore();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "missing id" });
  await db.collection("card").doc(id).delete();
  return { id, ok: true };
});
