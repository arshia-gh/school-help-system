import type { IPagination, IRawPagination } from './types'

declare global {
    namespace Express {
        export interface Request {
            rawPagination: IRawPagination
            pagination: IPagination
        }
    }
}