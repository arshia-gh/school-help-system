import Joi from "joi"
import { createValidator } from "express-joi-validation"

const validator = createValidator({ statusCode: 400 })

const PaginationValidationSchema = Joi.object({
    page: Joi.number().integer().positive().default(1),
    size: Joi.number().integer().min(10).default(10),
    orderBy: Joi.allow('acs', 'desc').default('acs'),
    sortBy: Joi.string().trim(),
})

const paginationQuery = validator.query(PaginationValidationSchema)

export default {
    instance: validator,
    paginationQuery,
}