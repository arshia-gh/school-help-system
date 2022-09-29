export interface Address {
  street: string
  state: string
  city: string
}

export interface School {
  id: string
  name: string
  address: Address
}

export type CreateSchool = Omit<School, 'id'>
