import { Injectable } from "@angular/core";
import { CreateRequest, Request, Tutorial, RequestType, ResourceType, StudentLevel, Resource, RequestStatus } from "../interfaces/Request.interface";
import { SchoolService } from "./school.service";
import { School } from "@app/interfaces/School.interface";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) { }

  private _requests: Request[];
  private requestsUpdated = new Subject<Request[]>();

  // to retrieve the post
  getRequests() {
    this.http.get<{ data: any }>('http://localhost:8080/requests', {
      params: {
        'includeSchool' : true
      }
    })
      .subscribe((res) => {
        this._requests = res.data;
        this.requestsUpdated.next([...this.requests]);
      })
    return this.requests;// creating new array by copying the old array
  }

  getRequestsUpdateListener() {
    return this.requestsUpdated.asObservable();
  }

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
    } as Request
    school.requests.push(newResource)
    this._requests.push(newResource)
    return newResource
  }

  getById(id: string) {
    return this.requests.find(r => r.id === id);
  }
}
