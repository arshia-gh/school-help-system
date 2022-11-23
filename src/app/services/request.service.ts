import { Injectable } from "@angular/core";
import { CreateRequest, Request, Tutorial, RequestType, Resource } from "../interfaces/Request.interface";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResult } from "@app/interfaces/Api.interface";

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

  getSchoolRequests(schoolId: string) {
    return this.http
      .get<SuccessResult<Request[]>>(`http://localhost:8080/schools/${schoolId}/requests`)
      .pipe(map(result => result.data))
  }

  getRequestsUpdateListener() {
    return this.requestsUpdated.asObservable();
  }

  get requests(): Request[] {
    return this._requests
  }

  addTutorial(tutorial: CreateRequest<Tutorial>, schoolId: string) {
    return this.http.post<SuccessResult<Tutorial>>(
      `http://localhost:8080/schools/${schoolId}/requests`,
      { ...tutorial, type: RequestType.Tutorial }
    ).pipe(map(result => result.data))
  }

  addResource(resource: CreateRequest<Resource>, schoolId: string) {
    return this.http.post<SuccessResult<Resource>>(
        `http://localhost:8080/schools/${schoolId}/requests`,
        { ...resource, type: RequestType.Resource }
    ).pipe(map(result => result.data))
  }

  getById(id: string) {
    return this.requests.find(r => r.id === id);
  }
}
