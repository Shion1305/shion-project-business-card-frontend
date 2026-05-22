import admin from "~/server/pkg/firebase-admin";
import type EventData from "~/type/EventData";

const db = admin.firestore();

type EventInput = Partial<Omit<EventData, "id">>;

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "missing id" });
  const body = await readBody<EventInput>(event);
  if (!body || typeof body !== "object") {
    throw createError({ statusCode: 400, statusMessage: "invalid body" });
  }
  const payload: Record<string, unknown> = {};
  for (const key of ["name", "description", "place", "date", "time"] as const) {
    if (key in body) {
      const value = (body as Record<string, unknown>)[key];
      payload[key] = value === "" ? admin.firestore.FieldValue.delete() : value;
    }
  }
  await db.collection("event").doc(id).update(payload);
  return { id, ok: true };
});
