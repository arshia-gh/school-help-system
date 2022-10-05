import { Injectable } from "@angular/core";
import { CreateSchool, School } from "../interfaces/School.interface";
import { v4 as uuid } from "uuid";
import { schools } from "./seed";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private _schools: School[] = schools

  constructor() {
  }

  get schools() {
    return this._schools
  }

  addSchool(school: CreateSchool) {
    this._schools.push({
      ...school,
      id: uuid(),
      requests: [],
    })

    return this._schools[this._schools.length - 1]
  }
}
