import { ValidationError } from "express-validator";
import lodash from 'lodash'

export function parseValidationErrors(errors: ValidationError[]) {
    return errors.reduce((result, err) => {
        const location = err.location ?? 'unlocated'
        lodash.set(result, `${location}.${err.param}`, err.msg)
        return result
    }, {} as any)
}