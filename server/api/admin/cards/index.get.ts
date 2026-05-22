import admin from "~/server/pkg/firebase-admin";
import type CardData from "~/type/CardData";

const db = admin.firestore();

export default defineEventHandler(async () => {
  const snap = await db.collection("card").get();
  const items: CardData[] = snap.docs.map((doc) => {
    const data = doc.data() as CardData;
    data.id = doc.id;
    return data;
  });
  return { items };
});
