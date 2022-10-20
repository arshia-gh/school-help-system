import { Request, Response, RequestHandler } from 'express'

export type RouteHandler = (req: Request, res: Response) => any

export interface IController {
    findOne?: RouteHandler,
    findMany?: RouteHandler,
    update?: RouteHandler,
    create?: RouteHandler,
}


type HttpMethods = 'get' | 'post' | 'delete' | 'patch' | 'head' 

type Middleware = (RequestHandler | RequestHandler[])[]

export interface IRestResource {
    useClass: { new(): IController }
    path: string
    middleware?: Middleware
    routes: IRestRoute[]
}

export interface IRestRoute {
    path?: string
    method: HttpMethods
    action: keyof IController
    middleware?: Middleware
}