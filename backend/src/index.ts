import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'

import env from './environment'

import { createApp } from 'src/app'
import { findOrCreateAdmin } from 'src/admin'
import resourceRoutes from 'src/routes'
import { httpErrorHandler, mongooseErrorHandler } from 'src/utils'

const app = createApp(env.apiPort)

// register logger and request parsers
app.prePipe(morgan(env.isProd ? 'combined' : 'dev'))
app.prePipe(express.json())
app.prePipe(express.urlencoded({ extended: true }))

// register error handlers
app.postPipe(mongooseErrorHandler)
app.postPipe(httpErrorHandler)

// register routes
app.controllers(resourceRoutes)

mongoose.connect(env.databaseUrl).then(async ({ connection: { host, port, name } }) => {
    console.log(`🤖 Connected to database at ${host}:${port}/${name}`);

    // check if admin doesn't exists, create one
    const admin = await findOrCreateAdmin()

    app.start()
})