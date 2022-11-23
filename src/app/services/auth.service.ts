import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResult } from "@app/interfaces/Api.interface";
import { BaseUser, User } from "@app/interfaces/User.interface";
import { catchError, map, Observable, Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string
  private _currentUser: User
  private authStatusListener = new Subject<User>();

  constructor(private _http: HttpClient) { }

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
    const $user = this._http.post<AuthResult>('http://localhost:8080/login', { username, password })
      .pipe(
        map(response => {
          const user = response?.user ?? null;
          this._currentUser = user;
          this.authStatusListener.next(user)
          return user;
        }),
      );
    return $user;
  }

  public logout() {
    this._token = null;
    this._currentUser = null;
    this.authStatusListener.next(null);
  }
}
