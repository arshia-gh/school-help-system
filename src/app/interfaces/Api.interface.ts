import { User } from "./User.interface"

export interface SuccessResult<T> {
  data: T
}

export interface AuthResult {
  data: User
  token: string
}