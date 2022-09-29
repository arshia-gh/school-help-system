import { Injectable } from "@angular/core";
import { CreateSchool, School } from "../interfaces/School.interface";
import { v4 as uuid } from "uuid";


@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private _schools: School[] = []

  addSchool(school: CreateSchool) {
    return this._schools.push({
      ...school,
      id: uuid(),
    })
  }
}
