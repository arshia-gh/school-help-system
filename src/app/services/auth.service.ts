import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResult } from "@app/interfaces/Api.interface";
import { CompleteSchoolAdmin, isAdmin, isVolunteer, User } from "@app/interfaces/User.interface";
import { filter, map, Observable, Subject, switchMap } from "rxjs";
import { SchoolService } from "./school.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string
  private _currentUser: User
  private authStatusListener = new Subject<User>();

  user$: Observable<User>

  constructor(private _http: HttpClient, private _schoolsService: SchoolService) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  get token(): string {
    return this._token
  }

  get currentUser(): User {
    return this._currentUser;
  }

  public login(username: string, password: string) {
    this.user$ = this._http.post<AuthResult>('http://localhost:8080/login', { username, password })
      .pipe(
        map(response => {
          const user = response?.user ?? null;
          this._currentUser = user;
          this.authStatusListener.next(user)
          return user;
        }),
      );
      this.user$
  }

  public logout() {
    this._token = null;
    this._currentUser = null;
    this.authStatusListener.next(null);
  }

  public admin(): Observable<CompleteSchoolAdmin> {
    return this.user$.pipe(
      filter(isAdmin),
      switchMap(admin =>
        this._schoolsService.findSchoolById(admin.school)
        .pipe(map(school => ({ ...admin, school })))
      )
    )
  }

  public volunteer() {
    return this.user$.pipe(filter(isVolunteer))
  }
}
