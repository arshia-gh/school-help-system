import { Injectable } from "@angular/core";
import { RequestService } from "./request.service";
import { UserService } from "./user.service";
import { CreateOffer, Offer } from "../interfaces/Offer.interface";
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private readonly _offers: Offer[]

  constructor(
    private requestService: RequestService,
    private userService: UserService
  ) {
  }

  get offers() {
    return this._offers
  }

  addOffer(offer: CreateOffer) {
    const newOffer: Offer = {
      ...offer,
      id: uuid(),
    }

    this._offers.push(newOffer);
    return newOffer;
  }
}
