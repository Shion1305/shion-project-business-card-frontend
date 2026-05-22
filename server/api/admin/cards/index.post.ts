import admin from "~/server/pkg/firebase-admin";
import type CardData from "~/type/CardData";

const db = admin.firestore();

type CardInput = Partial<Omit<CardData, "id">> & { id?: string };

export default defineEventHandler(async (event) => {
  const body = await readBody<CardInput>(event);
  if (!body || typeof body !== "object") {
    throw createError({ statusCode: 400, statusMessage: "invalid body" });
  }
  const { id, ...rest } = body;
  const payload: Record<string, unknown> = {};
  for (const key of ["recipient", "version", "exchangeDate", "eventID"] as const) {
    const value = (rest as Record<string, unknown>)[key];
    if (value !== undefined && value !== "") payload[key] = value;
  }
  if (!payload.version) payload.version = "v1";
  const col = db.collection("card");
  if (id) {
    await col.doc(id).set(payload, { merge: false });
    return { id, ...payload };
  }
  const ref = await col.add(payload);
  return { id: ref.id, ...payload };
});
