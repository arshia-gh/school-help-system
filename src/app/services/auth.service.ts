import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResult } from "@app/interfaces/Api.interface";
import { User } from "@app/interfaces/User.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string

  constructor(private _http: HttpClient) {}

  public login(username: string, password: string) {
    this._http.post<AuthResult>('http://localhost:8080/login', { username, password })
    .subscribe(({ token }) => this._token = token)
  }
}
