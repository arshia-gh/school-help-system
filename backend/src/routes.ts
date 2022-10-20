import { IRestResource } from 'src/types'
import { UsersController, RequestsController } from 'src/controllers'
import { pagination } from 'src/utils'

export const routes: IRestResource[] = [
    {
        useClass: UsersController,
        path: '/users',
        routes: [
            {
                action: 'create',
                method: 'post',
            }
        ]
    },
    {
        useClass: UsersController.EmailsController,
        path: '/users/emails',
        routes: [ { action: 'findOne', method: 'head' } ]
    },
    {
        useClass: UsersController.UsernamesController,
        path: '/users/usernames',
        routes: [ { action: 'findOne', method: 'head' } ]
    },
    {
        useClass: RequestsController,
        path: '/requests',
        routes: [
            {
                action: 'create',
                method: 'post',
                middleware: []
            },
            {
                action: 'findMany',
                method: 'get',
                middleware: [pagination]
            }
        ]
    }
]

export default routes