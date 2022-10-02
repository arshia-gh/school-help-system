import type { Request } from "./Request.interface"

export interface Address {
  street: string
  state: string
  city: string
}

export interface School {
  id: string
  name: string
  address: Address
  requests: Request[]
}

export type CreateSchool = Omit<School, 'id'>
