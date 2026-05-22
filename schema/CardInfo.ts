interface EventInfo {
  id: string;
  name: string;
  description?: string;
  place?: string;
  date?: string;
  time?: string;
}

interface CardInfo {
  id: string;
  recipient?: string;
  exchangeDate?: string;
  event?: EventInfo;
}

export type { EventInfo, CardInfo };
