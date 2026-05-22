import admin from "~/server/pkg/firebase-admin";
import type EventData from "~/type/EventData";

const db = admin.firestore();

export default defineEventHandler(async () => {
  const snap = await db.collection("event").get();
  const items: EventData[] = snap.docs.map((doc) => {
    const data = doc.data() as EventData;
    data.id = doc.id;
    return data;
  });
  return { items };
});
