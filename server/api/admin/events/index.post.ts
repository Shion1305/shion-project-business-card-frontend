import admin from "~/server/pkg/firebase-admin";
import type EventData from "~/type/EventData";

const db = admin.firestore();

type EventInput = Partial<Omit<EventData, "id">> & { id?: string };

export default defineEventHandler(async (event) => {
  const body = await readBody<EventInput>(event);
  if (!body || typeof body !== "object") {
    throw createError({ statusCode: 400, statusMessage: "invalid body" });
  }
  const { id, ...rest } = body;
  if (!rest.name) {
    throw createError({ statusCode: 400, statusMessage: "name is required" });
  }
  const payload: Record<string, unknown> = {};
  for (const key of ["name", "description", "place", "date", "time"] as const) {
    const value = (rest as Record<string, unknown>)[key];
    if (value !== undefined && value !== "") payload[key] = value;
  }
  const col = db.collection("event");
  if (id) {
    await col.doc(id).set(payload, { merge: false });
    return { id, ...payload };
  }
  const ref = await col.add(payload);
  return { id: ref.id, ...payload };
});
