import { RequestHandler, Request } from "express";
import { Query } from "mongoose";

import { IRawPagination, IPagination } from "src/types";
import validator from './validator'

export const pagination: RequestHandler[] = [
    validator.paginationQuery,
    (req, _, next) => {
        const { page, size, sortBy, orderBy } = req.query as any
        const input = { page, size, sortBy, orderBy }
        
        req.pagination = parsePagination(input) 
        req.rawPagination = input

        next()
    },
]

function parsePagination<T>({ page, size, sortBy, orderBy }: IRawPagination): IPagination {
    const sort = sortBy ? { field: sortBy, order: orderBy ?? 'asc' } : undefined
    return { 
        skip: (page - 1) * size, 
        limit: size,
        sort
    }
}

export function paginateQuery<R, T>(query: Query<R, T>, request: Request) {
    const { skip, limit, sort } = request.pagination
    const paginatedQuery = query.skip(skip).limit(limit)
    return sort ? paginatedQuery.sort({ [sort.field]: sort.order }) : paginatedQuery
}