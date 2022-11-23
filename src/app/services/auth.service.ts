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
  private authStatusListener = new Subject<User>();

  constructor(private _http: HttpClient) { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  public token() {
    return this._token
  }

  public login(username: string, password: string) {
    const $user = this._http.post<AuthResult>('http://localhost:8080/login', { username, password })
      .pipe(
        map(response => {
          const user = response.user;
          this.authStatusListener.next(user)
          return user;
        }),
        catchError(response => null)
      );
    return $user;
  }

  public logout() {
    this.token = null;
    this.authStatusListener.next(null);
  }
}
