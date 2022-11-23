import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResult } from "@app/interfaces/Api.interface";
import { User } from "@app/interfaces/User.interface";
import { catchError, map, Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string
  private $user: Observable<User>;

  constructor(private _http: HttpClient) {}

  public token() {
    return this._token
  }

  public login(username: string, password: string) {
    const $user = this._http.post<AuthResult>('http://localhost:8080/login', { username, password })
    .pipe(
      map(response => response.data),
      catchError(response => null)
    )
    return $user;
  }
}
