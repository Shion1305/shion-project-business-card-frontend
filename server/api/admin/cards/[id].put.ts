import admin from "~/server/pkg/firebase-admin";
import type CardData from "~/type/CardData";

const db = admin.firestore();

type CardInput = Partial<Omit<CardData, "id">>;

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "missing id" });
  const body = await readBody<CardInput>(event);
  if (!body || typeof body !== "object") {
    throw createError({ statusCode: 400, statusMessage: "invalid body" });
  }
  const payload: Record<string, unknown> = {};
  for (const key of ["recipient", "version", "exchangeDate", "eventID"] as const) {
    if (key in body) {
      const value = (body as Record<string, unknown>)[key];
      payload[key] = value === "" ? admin.firestore.FieldValue.delete() : value;
    }
  }
  await db.collection("card").doc(id).update(payload);
  return { id, ok: true };
});
