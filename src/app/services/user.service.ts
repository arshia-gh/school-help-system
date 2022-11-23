import { Injectable, EventEmitter } from "@angular/core";
import { CreateUser, isAdmin, SchoolAdmin, User, UserType, Volunteer } from "../interfaces/User.interface";
import { v4 as uuid } from 'uuid'
import { users } from "./seed";
import { School } from "@app/interfaces/School.interface";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";

interface AuthEvent {
  type: 'login' | 'logout',
  data: User
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users: User[] = users
  private _currentUser?: User
  private _commonFields: ['username', 'password', 'email'] = ['username', 'password', 'email']
  public authEvent = new EventEmitter<AuthEvent>()

  constructor(private _router: Router, private _snackBar: MatSnackBar, private _http: HttpClient) { }

  get users() {
    return this._users
  }

  get currentUser() {
    return this._currentUser
  }

  updateAdmin(admin: SchoolAdmin): void {
    const userId = this.currentUser.id;

    if (!userId) throw new Error('User is not logged in');

    const index = users.findIndex(u => u.id === userId);
    users[index] = admin;
    this._currentUser = admin;
    this.authEvent.emit({
      type: 'login',
      data: this._currentUser
    })
  }

  addSchoolAdmin(schoolAdmin: CreateUser<SchoolAdmin>, school: School) {
    const newAdmin = {
      ...schoolAdmin,
      school,
      id: uuid(),
      type: UserType.SchoolAdmin,
    }
    this._users.push(newAdmin as User)
    this.login(newAdmin.username, newAdmin.password)
    return newAdmin
  }

  addVolunteer(volunteer: CreateUser<Volunteer>) {
    const newVolunteer = {
      ...volunteer,
      offers: [],
      id: uuid(),
      type: UserType.Volunteer,
    }

    this._users.push(newVolunteer as User)
    this.login(newVolunteer.username, newVolunteer.password)
    return newVolunteer
  }

  login(username: string, password: string) {
    this._currentUser = this._users.find(
      user => user.username === username && user.password === password
    )

    if (this._currentUser) {
      this.authEvent.emit({
        type: 'login',
        data: this._currentUser
      })

      const destination = isAdmin(this._currentUser) ? 'dashboard' : 'requests';
      this._router.navigate(['/' + destination])
      this._snackBar.open(`Login Successful. Redirected you to view ${destination}`, 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        politeness: 'polite'
      });
    }

    return this._currentUser
  }

  logout() {
    const user = this._currentUser
    this._currentUser = undefined

    this.authEvent.emit({
      type: 'logout',
      data: user
    })

    if (!this._router.isActive('/requests', false))
      this._router.navigate(['/auth/login'])

    this._snackBar.open(`Logout Successfull. Redirected you to login page`, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      politeness: 'polite'
    });

    return user
  }

  loggedIn() {
    return !!this._currentUser
  }
}
