import { create } from "domain";
import { ErrorRequestHandler } from "express";
import createError from 'http-errors'
import { mongo } from "mongoose";

export const httpErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (!createError.isHttpError(err)) return next(err)

    const { status, message, name, properties } = err
    res.status(status).json({
        error: {
            name,
            message,
            properties,
        },
    })
}

export const mongooseErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err)
    if (!(err instanceof mongo.MongoServerError)) return next(err)
    
    if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0]
        return next(
            createError(
                409, 
                'resource conflicts with existing resource',
                { properties: { [key]: `${key} must be unique` } }
            )
        )
    }
    
    return next(
        createError(500, 'something went wrong, please contact the administrator')
    )
}