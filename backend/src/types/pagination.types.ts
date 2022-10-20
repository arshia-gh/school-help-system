import { SortOrder } from "mongoose"

export interface IRawPagination {
    page: number
    size: number
    sortBy?: string
    orderBy?: 'asc' | 'desc'
}

export interface IPagination {
    skip: number
    limit: number
    sort?: Sort
}

export interface Sort {
    field: string
    order: SortOrder
}