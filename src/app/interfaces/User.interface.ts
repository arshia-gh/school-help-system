import { School } from "./School.interface"

export enum UserType {
  SchoolAdmin = 'SchoolAdmin',
  Volunteer = 'Volunteer',
}

export interface BaseUser {
  id: string
  username: string
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
  school: string
  type: UserType.SchoolAdmin
}

export type CompleteSchoolAdmin = Omit<SchoolAdmin, 'school'> & { school: School }

export interface Volunteer extends BaseUser {
  occupation: string
  dob: string
  type: UserType.Volunteer
}

export type CreateUser<UserType = BaseUser> = Omit<UserType, 'id' | 'type'> & { password: string }
export type UserLogin = Pick<User, 'username'>

export function isAdmin(user: User): user is SchoolAdmin {
  return user.type === UserType.SchoolAdmin
}

export function isVolunteer(user: User): user is Volunteer {
  return user.type === UserType.Volunteer
}
