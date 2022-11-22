import { mongo } from 'mongoose'
import createHttpError from 'http-errors'

import env from '../environment'

export function routeNotFoundHandler(req, res, next) {
    next(createHttpError(404, 'invalid route or method'))
}

export function mongooseErrorHandler(err, req, res, next) {
    if (!(err instanceof mongo.MongoServerError)) return next(err)

    if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0]
        return next(
            createHttpError(
                409,
                'resource conflicts with existing resource',
                { properties: { [key]: `${key} must be unique` } }
            )
        )
    }

    next(err)
}

export function httpErrorHandler(err, req, res, next) {
    if (!createHttpError.isHttpError(err)) return next(err)

    const { status, message, name, properties, fields } = err
    res.status(status).json({
        error: {
            name,
            message,
            status,
            properties,
            fields,
        },
    })
}


export default {
    routeNotFoundHandler,
    httpErrorHandler,
    mongooseErrorHandler,
}