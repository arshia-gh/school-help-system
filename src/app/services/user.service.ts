import { Injectable, EventEmitter } from "@angular/core";
import { CreateUser, SchoolAdmin, User, UserType, Volunteer } from "../interfaces/User.interface";
import { v4 as uuid } from 'uuid'
import { SchoolService } from "./school.service";
import { users } from "./seed";

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

  get users() {
    return this._users
  }

  get currentUser() {
    return this._currentUser
  }

  constructor(private schoolService: SchoolService) {}

  addSchoolAdmin(schoolAdmin: CreateUser<SchoolAdmin>) {
    return this._users.push({
      ...schoolAdmin,
      id: uuid(),
      type: UserType.SchoolAdmin,
    })
  }

  addVolunteer(volunteer: CreateUser<Volunteer>) {
    const newVolunteer ={
      ...volunteer,
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

    return user
  }
}
