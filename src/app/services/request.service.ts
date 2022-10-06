import { Injectable } from "@angular/core";
import { CreateRequest, Request, Tutorial, RequestType, ResourceType, StudentLevel, Resource, RequestStatus } from "../interfaces/Request.interface";
import { v4 as uuid } from "uuid";
import { SchoolService } from "./school.service";
import { requests } from "./seed";
import { School } from "@app/interfaces/School.interface";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private _requests: Request[] = requests

  get requests(): Request[] {
    return this._requests
  }

  addTutorial(tutorial: CreateRequest<Tutorial>, school: School) {
    const newTutorial = {
      ...tutorial,
      school,
      status: RequestStatus.New,
      offers: [],
      requestDate: new Date(),
      type: RequestType.Tutorial,
      id: uuid(),
    } as Tutorial
    school.requests.push(newTutorial)
    this._requests.push(newTutorial)
    return newTutorial
  }

  addResource(tutorial: CreateRequest<Resource>, school: School) {
    const newResource = {
      ...tutorial,
      school,
      status: RequestStatus.New,
      offers: [],
      requestDate: new Date(),
      type: RequestType.Resource,
      id: uuid(),
    } as Request
    school.requests.push(newResource)
    this._requests.push(newResource)
    return newResource
  }

  getById(id: string) {
    return requests.find(r => r.id = id);
  }
}
