import { Injectable } from "@angular/core";
import { CreateUser, SchoolAdmin, User, UserType, Volunteer } from "../interfaces/User.interface";
import { v4 as uuid } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users: User[] = []
  private _currentUser?: User
  private _commonFields: ['username', 'password', 'email'] = ['username', 'password', 'email']

  get users() {
    return this._users
  }

  get currentUser() {
    return this._currentUser
  }

  // isUniqueUser(newUser: CreateUser) {
  //   this._commonFields
  //       .filter(field => this._users.some(u => u[field] === newUser[field]))
  // }

  addSchoolAdmin(schoolAdmin: CreateUser<SchoolAdmin>) {
    return this._users.push({
      ...schoolAdmin,
      id: uuid(),
      type: UserType.SchoolAdmin,
    })
  }

  addVolunteer(volunteer: CreateUser<Volunteer>) {
    return this._users.push({
      ...volunteer,
      id: uuid(),
      type: UserType.Volunteer
    })
  }

  login(username: string, password: string) {
    this._currentUser = this._users.find(
      user => user.username === username && user.password === password
    )
    return this._currentUser
  }

  logout() {
    const user = this._currentUser
    this._currentUser = undefined
    return user
  }
}
