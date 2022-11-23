import { Injectable } from "@angular/core";
import { CreateOffer, Offer } from "../interfaces/Offer.interface";
import { HttpClient } from "@angular/common/http";
import { SuccessResult } from "@app/interfaces/Api.interface";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private readonly _offers: Offer[] = [];

  constructor(private _http: HttpClient) {}

  get offers() {
    // use requestOffers
    return this._offers;
  }

  requestOffers(requestId: string) {
    return this._http
      .get<SuccessResult<Offer>>(`http://localhost:8080/requests/${requestId}/offers`)
      .pipe(map(result => result.data))
  }

  addOffer(requestId: string, offer: CreateOffer) {
    return this._http
    .post<SuccessResult<Offer>>(
      `http://localhost:8080/requests/${requestId}/offers`,
      offer
    )
    .pipe(map(result => result.data))
  }

  getById(requestId: string, offerId: string): Observable<Offer> {
    return this._http
      .get<SuccessResult<Offer>>(`http://localhost:8080/requests/${requestId}/offers/${offerId}`)
      .pipe(map(result => result.data))
  }
}
