import { nanoid } from 'nanoid';


const partnerIdKey = Symbol('partnerId');
const sessionIdKey = Symbol('sessionId');

export class ThirtyFiveUp {
  [partnerIdKey]: string;
  [sessionIdKey]: string;

  constructor(partnerId: string, sessionId: string) {
    this[partnerIdKey] = partnerId;
    this[sessionIdKey] = sessionId;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getProductRecommendations(): void {
  }
}

export function initialise(partnerId: string, sessionId?: string)
: ThirtyFiveUp {
  return new ThirtyFiveUp(partnerId, sessionId || nanoid());
}
