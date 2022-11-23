import { Injectable } from "@angular/core";
import { CreateSchool, School } from "../interfaces/School.interface";
import { HttpClient } from "@angular/common/http";
import { SuccessResult } from "@app/interfaces/Api.interface";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private _http: HttpClient) {}

  public schools() {
    return this._http
      .get<SuccessResult<School[]>>('http://localhost:8080/schools')
      .pipe(map(result => result.data))
  }

  public findSchoolById(schoolId: string) {
    return this._http
      .get<SuccessResult<School>>(`http://localhost:8080/schools/${schoolId}`)
      .pipe(map(result => result.data))
  }


  addSchool(school: CreateSchool) {
    return this._http
    .post<SuccessResult<School>>(
      `http://localhost:8080/schools`,
      school
    )
    .pipe(map(result => result.data))
  }
}
