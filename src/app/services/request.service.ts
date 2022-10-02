import { Injectable } from "@angular/core";
import { CreateRequest, Request, Tutorial, RequestType, ResourceType, StudentLevel, Resource } from "../interfaces/Request.interface";
import { v4 as uuid } from "uuid";
import { SchoolService } from "./school.service";
import { requests } from "./seed";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private _requests: Request[] = requests

  get requests(): Request[] {
    return this._requests
  }

  addTutorial(request: CreateRequest<Tutorial>) {
    return this._requests.push({
      ...request,
      type: RequestType.Tutorial,
      id: uuid(),
    })
  }

  addResource(request: CreateRequest<Resource>) {
    return this._requests.push({
      ...request,
      type: RequestType.Resource,
      id: uuid(),
    })
  }
}
