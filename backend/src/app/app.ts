import express, { ErrorRequestHandler, RequestHandler } from 'express'
import { Server } from 'http'
import chalk from 'chalk' 

import { IRestResource } from 'src/types'
import { _buildRouter } from './_buildRoutes'

export function createApp(port: number) {
    const app = express()
    let server: Server
    const url = `http://localhost:${port}`

    // flag used to check if handlers (routers, pre and post) are registered
    let hasInitialized = false

    // pre-middleware must be registered before any other handlers
    const preHandlers: (RequestHandler | ErrorRequestHandler)[] = []

    // post-middleware must be registered after any other handlers
    const postHandlers: (RequestHandler | ErrorRequestHandler)[] = []

    // controller routes definition
    const resourceRoutes: IRestResource[] = []

    const _init = () => {
        // register all pre handlers
        preHandlers.forEach(handler => app.use(handler))

        // map all controllers to routers and register them
        resourceRoutes.forEach(resource => {
            app.use(resource.path, _buildRouter(resource))
            const resName = chalk.green(resource.path)
            console.log(
                `📌 Resource ${resName} was registered with ${chalk.green(resource.useClass.name)}`
            )
        })  

        // register all post handlers
        postHandlers.forEach(handler => app.use(handler))

        // set the flag to true to prevent from registering again
        hasInitialized = true
    }

    const start = () => {
        if (!hasInitialized) _init()
        if (server) return

        server = app.listen(port, () => {
            console.log(
                `🚀 Server started at ${chalk.green(`http://localhost:${port}`)}`
            );
        })
    }

    const stop = () => {
        if (!server) return

        server.close(err => {
            if (err) {
                console.log(`💢 server at ${chalk.yellow(url)} was stopped with an error`)
                console.error(err)
            }
            console.log(`💥 Server at ${chalk.yellow(url)} was stopped`)
        })
    }

    const prePipe = (...middleware: any[]) => {
        preHandlers.push(...middleware)
    }

    const postPipe = (...middleware: any[]) => {
        postHandlers.push(...middleware)
    }

    const controllers = (resources: IRestResource[]) => resourceRoutes.push(...resources)

    return {
        get instance() { return app },
        get url() { return url },
        prePipe,
        postPipe,
        controllers,
        start,
        stop,
    }
}
