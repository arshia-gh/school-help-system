import { Injectable } from "@angular/core";
import { CreateUser, SchoolAdmin, Volunteer } from "../interfaces/User.interface";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { SuccessResult } from "@app/interfaces/Api.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _router: Router, private _snackBar: MatSnackBar, private _http: HttpClient) { }

  updateAdmin(admin: CreateUser<SchoolAdmin>) {
    console.log(admin.username)
    return this._http
      .patch<SuccessResult<SchoolAdmin>>(
        `http://localhost:8080/users/${admin.username}`, admin
      )
      .pipe(map(result => result.data))
  }

  addSchoolAdmin(schoolAdmin: CreateUser<SchoolAdmin>, schoolId: string) {
    return this._http
      .post<SuccessResult<SchoolAdmin>>(
        `http://localhost:8080/schools/${schoolId}/admins`,
        schoolAdmin
      )
      .pipe(map(result => result.data))
  }

  addVolunteer(volunteer: any) {
    return this._http
      .post<SuccessResult<Volunteer>>(`http://localhost:8080/users`, volunteer)
      .pipe(map(result => result.data ))
  }
}
