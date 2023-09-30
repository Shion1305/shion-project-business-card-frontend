import admin from "~/server/pkg/firebase-admin";
import CardData from "~/type/CardData";
import { CardInfo, EventInfo } from "~/schema/CardInfo";
import EventData from "~/type/EventData";

const db = admin.firestore();

export default defineEventHandler(async (event) => {
  // get query
  const query = getQuery(event);
  const { id } = query;
  if (!id) {
    return sendError(event, new Error("invalid id"));
  }

  const resp = {} as CardInfo;
  const cardID = id as string;
  const cardData = await getCardData(cardID);
  if (!cardData) {
    return sendError(event, new Error("card not found"));
  }
  resp.id = cardID;
  resp.exchangeDate = cardData.exchangeDate;
  if (cardData.eventID) {
    const eventData = await getEventData(cardData.eventID);
    if (!eventData) {
      return sendError(event, new Error("event not found"));
    }
    resp.event = {} as EventInfo;
    resp.event.id = eventData.id;
    resp.event.name = eventData.name;
    resp.event.description = eventData.description;
    resp.event.date = eventData.date;
    resp.event.time = eventData.time;
  }
  return resp;
});

async function getCardData(cardID: string): Promise<CardData | null> {
  const doc = await db.collection("card").doc(cardID).get();
  if (doc.exists) {
    const data = doc.data() as CardData;
    if (data) {
      data.id = doc.id;
      return data;
    }
  }
  return null;
}

async function getEventData(eventID: string): Promise<EventData | null> {
  const doc = await db.collection("event").doc(eventID).get();
  if (doc.exists) {
    const data = doc.data() as EventData;
    if (data) {
      data.id = doc.id;
      return data;
    }
  }
  return null;
}
