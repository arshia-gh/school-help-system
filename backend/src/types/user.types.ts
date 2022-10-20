
export enum UserType {
    SchoolAdmin = 'SchoolAdmin',
    Volunteer = 'Volunteer',
}

export interface ISimpleUser {
    username: string
    password: string
    email: string
    fullname: string
    phoneNo: string
}

export interface ISchoolAdmin extends ISimpleUser {
    staffId: string
    position: string
    type: UserType.SchoolAdmin
}

export interface IVolunteer extends ISimpleUser {
    occupation: string
    dob: Date,
    type: UserType.Volunteer
}

export type UserUniqueKey = Extract<keyof IUser, 'username' | 'email' | 'phoneNo'>

export type IUser = ISchoolAdmin | IVolunteer

export const isSchoolAdmin = (user: IUser): user is ISchoolAdmin => 
    user.type === UserType.SchoolAdmin

export const isVolunteer = (user: IUser): user is IVolunteer => 
    user.type === UserType.Volunteer