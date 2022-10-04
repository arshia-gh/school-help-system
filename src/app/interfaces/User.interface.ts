import type { School } from "./School.interface"

export enum UserType {
  SchoolAdmin = 'SchoolAdmin',
  Volunteer = 'Volunteer',
}

interface BaseUser {
  id: string
  username: string
  password: string
  email: string
  phoneNo: string
  fullname: string

  // discriminator field
  type: UserType
}

export type User = BaseUser & (SchoolAdmin | Volunteer)

export interface SchoolAdmin extends BaseUser {
  position: string
  staffId: string
  school: School
  type: UserType.SchoolAdmin
}

export interface Volunteer extends BaseUser {
  occupation: string
  dob: Date
  type: UserType.Volunteer
}

export type CreateUser<UserType = BaseUser> = Omit<UserType, 'id' | 'type'>
export type UserLogin = Pick<User, 'username' | 'password'>

export function isAdmin(user: User): user is SchoolAdmin {
  return user.type === UserType.SchoolAdmin
}

export function isVolunteer(user: User): user is Volunteer {
  return user.type === UserType.Volunteer
}
