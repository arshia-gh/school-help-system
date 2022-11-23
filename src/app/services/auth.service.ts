import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResult } from "@app/interfaces/Api.interface";
import { CompleteSchoolAdmin, isAdmin, isVolunteer, User } from "@app/interfaces/User.interface";
import { filter, map, Observable, switchMap } from "rxjs";
import { SchoolService } from "./school.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string
  $user: Observable<User>;

  constructor(private _http: HttpClient, private _schoolsService: SchoolService) {}

  public token() {
    return this._token
  }

  public login(username: string, password: string) {
    const $user = this._http.post<AuthResult>('http://localhost:8080/login', { username, password })
    .pipe(
      map(response => response.data),
    )

    return $user;
  }

  public admin(): Observable<CompleteSchoolAdmin> {
    return this.$user.pipe(
      filter(isAdmin),
      switchMap(admin =>
        this._schoolsService.findSchoolById(admin.school)
        .pipe(map(school => ({ ...admin, school })))
      )
    )
  }

  public volunteer() {
    return this.$user.pipe(filter(isVolunteer))
  }
}
