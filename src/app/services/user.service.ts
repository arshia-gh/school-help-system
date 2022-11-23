import { Injectable } from "@angular/core";
import { CreateUser, SchoolAdmin, User, Volunteer } from "../interfaces/User.interface";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { SuccessResult } from "@app/interfaces/Api.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser?: User
  constructor(private _router: Router, private _snackBar: MatSnackBar, private _http: HttpClient) { }

  updateAdmin(admin: SchoolAdmin): void {
    // const userId = this._currentUser.id;

    // if (!userId) throw new Error('User is not logged in');

    // const index = users.findIndex(u => u.id === userId);
    // users[index] = admin;
    // this._currentUser = admin;
    // this.authEvent.emit({
    //   type: 'login',
    //   data: this._currentUser
    // })
  }

  addSchoolAdmin(schoolAdmin: CreateUser<SchoolAdmin>, schoolId: string) {
    return this._http
      .post<SuccessResult<SchoolAdmin>>(
        `http://localhost:8080/schools/${schoolId}/admins`,
        schoolAdmin
      )
      .pipe(map(result => result))
  }

  addVolunteer(volunteer: CreateUser<Volunteer>) {
    return this._http
    .post<SuccessResult<Volunteer>>(`http://localhost:8080/signup`, volunteer)
    .pipe(map(result => result))
  }

  // login(username: string, password: string) {
  //   this._currentUser = this._users.find(
  //     user => user.username === username && user.password === password
  //   )

  //   if (this._currentUser) {
  //     this.authEvent.emit({
  //       type: 'login',
  //       data: this._currentUser
  //     })

  //     const destination = isAdmin(this._currentUser) ? 'dashboard' : 'requests';
  //     this._router.navigate(['/' + destination])
  //     this._snackBar.open(`Login Successful. Redirected you to view ${destination}`, 'OK', {
  //       duration: 3000,
  //       verticalPosition: 'top',
  //       politeness: 'polite'
  //     });
  //   }

  //   return this._currentUser
  // }

  // logout() {
  //   const user = this._currentUser
  //   this._currentUser = undefined

  //   this.authEvent.emit({
  //     type: 'logout',
  //     data: user
  //   })

  //   if (!this._router.isActive('/requests', false))
  //     this._router.navigate(['/auth/login'])

  //   this._snackBar.open(`Logout Successfull. Redirected you to login page`, 'OK', {
  //     duration: 3000,
  //     verticalPosition: 'top',
  //     politeness: 'polite'
  //   });

  //   return user
  // }

  // loggedIn() {
  //   return !!this._currentUser
  // }
}
