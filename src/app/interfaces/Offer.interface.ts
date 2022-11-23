import type { Request } from "./Request.interface";
import type { Volunteer } from "./User.interface";

export enum OfferStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}
export interface Offer {
  id: string
  remarks: string
  request: Request
  volunteer: Volunteer
  status: OfferStatus
  dateOffered: Date
}

export type CreateOffer = Omit<Offer, "id" | 'status' | 'dateOffered' | 'volunteer' | 'status' | 'request'>;
