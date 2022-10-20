import type { Request } from 'express';
import { isTutorial, RequestModel, ResourceModel, TutorialModel } from '../schemas';
import { paginateQuery } from '../utils/pagination';

export class RequestsController {
    async create(req: Request) {
        const data = req.body
        const requestModel = isTutorial(data) ? TutorialModel : ResourceModel
        return new requestModel({ ...data }).save()
    }

    async findMany(req: Request) {
        const result = await paginateQuery(RequestModel.find(), req.pagination)
        const count = await RequestModel.countDocuments()
        return { data: result, count }
    }
}