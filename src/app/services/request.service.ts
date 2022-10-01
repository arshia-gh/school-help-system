import { Injectable } from "@angular/core";
import { CreateRequest, Request, Tutorial, ramTut } from "../interfaces/Request.interface";
import { v4 as uuid } from "uuid";


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private _requests: Request[] = []

  constructor() {
    for (let i = 0; i < 10; i++) {
      this._requests.push(ramTut());
    }
  }

  getRequest(): Request[] {
    return this._requests;
  }

  addRequest(request: CreateRequest) {
    return this._requests.push({
      ...request,
      id: uuid(),
    })
  }
}
