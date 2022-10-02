import type { Request } from "./Request.interface";
import type { Volunteer } from "./User.interface";

export interface Offer {
  id: string
  remarks: string
  request: Request
  volunteer: Volunteer
}

export type CreateOffer = Omit<Offer, "id">;
