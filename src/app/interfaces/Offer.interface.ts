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
  status: OfferStatus
  createdAt: Date
  submittedBy: Volunteer
}

export type CreateOffer = Omit<Offer, "id" | 'status' | 'createdAt' | 'submittedBy' | 'status'>;
