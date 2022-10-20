export interface ISchool {
    name: string
    address: IAddress
}

export interface IAddress {
    state: string
    city: string
    street: string
}