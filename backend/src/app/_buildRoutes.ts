import { RequestHandler, Router, IRouter } from 'express'

import createError from 'http-errors'
import asyncHandler from 'express-async-handler'

import { IController, IRestResource, IRestRoute } from 'src/types'
import { enableValidation } from 'src/utils'

function _routeHandler(controller: IController, route: IRestRoute): RequestHandler {
    return asyncHandler(async (req, res) => {
        const routeHandler = controller[route.action]
        if (!routeHandler) throw createError(500, 'undefined action handler')

        const result = await routeHandler(req, res)
        if (!result) throw createError(404, 'resource does not exist')
        
        res.json({
            ...result,
            pagination: req.rawPagination,
        })
    })
}

export function _buildRouter({ useClass, routes, middleware }: IRestResource): IRouter {
    const controller = new useClass(), router = Router()
    middleware?.forEach(mw => router.use(mw)) // register middleware
    // register routes
    routes.forEach(route =>
        router[route.method](
            route.path ?? '/',
            route.middleware?.flat() ?? [],
            enableValidation,
            _routeHandler(controller, route),
        )
    )
    return router
}