import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import env from '../environment';
import { UserType } from '../models/user.model';

export function VerifyJwtToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    let token = 
        authHeader && 
        authHeader.startsWith('Bearer ') &&
        authHeader.split(' ')[1];

    if (!token) {
        return next(
            createHttpError(401, 'unauthenticated access to resource')
        );
    }

    jwt.verify(token, env.jwtAccessSecret, (err, payload) => {
        if (err) {
            return next(
                createHttpError(403, 'unauthorized access to resource')
            );
        }
        req.user = payload;
        next();
    }); 
}

export function IsSchoolAdmin(_, __, next) {
    if (req.user && req.user.type === UserType.SchoolAdmin) next()
    return createHttpError(403, 'only school admins are allowed');
}

export function IsVolunteer(_, __, next) {
    if (req.user && req.user.type === UserType.Volunteer) next();
    return createHttpError(403, 'only volunteers are allowed');
}

export default {
    VerifyJwtToken,
    IsSchoolAdmin,
    IsVolunteer,
}