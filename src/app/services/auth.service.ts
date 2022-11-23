import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResult, SuccessResult } from "@app/interfaces/Api.interface";
import { isAdmin, isVolunteer, User } from "@app/interfaces/User.interface";
import { BehaviorSubject, map, of, Subject, switchMap, tap } from "rxjs";
import { SchoolService } from "./school.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string
  private _currentUser: User
  private authStatusListener = new Subject<User>();

  private user$ = new BehaviorSubject<User>(null)

  constructor(private _http: HttpClient, private _schoolsService: SchoolService) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUser() {
    return this.user$.asObservable();
  }

  get token(): string {
    return this._token
  }

  get currentUser(): User {
    return this._currentUser;
  }

  public login(username: string, password: string) {
    // refactor this
    return this._http.post<AuthResult>('http://localhost:8080/login', { username, password })
      .pipe(
        map(response => {
          if (!response || !response.user) return null;
          const user = response.user

          this._currentUser = user;
          this._token = response.accessToken
          this.authStatusListener.next(user)

          this.user$.next(user);

          return user;
        }),
      )
  }

  public logout() {
    this._token = null;
    this._currentUser = null;
    this.authStatusListener.next(null);

    this.user$.next(null)
  }

  public refetchUser() {
    this._http.get<SuccessResult<User>>('http://localhost:8080/auth')
    .pipe(
      tap(user => this.user$.next(user.data))
    )
    .subscribe()
  }

  public admin() {
    return this.user$.pipe(
      switchMap(user => {
        if (user != null && isAdmin(user)) {
          return this._schoolsService.findSchoolById(user.school)
          .pipe(map(school => ({ ...user, school })))
        }
        return of(null)
      })
    )
  }

  public volunteer() {
    return this.user$.pipe(
      map(user => {
        if (user != null && isVolunteer(user)) {
          return user
        }
        return of(null)
      })
    )
  }
}
