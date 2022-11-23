import express from 'express'
import morgan from 'morgan';

import Server from './app';
import env from './environment';
import database from './database';

import mainRouter from './routers'
import ErrorHandler from './middlewares/error-handlers';
import authenticate from './middlewares/authenticate';

// initialize the app
const server = new Server(env.apiPort)
const app = server.app

//resolve CORS
app.use(authenticate.SetCORS);

// log incoming requests
app.use(morgan(env.isProd ? 'combined' : 'dev'))

// parser incoming requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// register routers
app.use(mainRouter);

app.use(ErrorHandler.routeNotFoundHandler)

// register error handlers
app.use(ErrorHandler.mongooseErrorHandler)
app.use(ErrorHandler.httpErrorHandler)

database().then(() => server.start())
