import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import env from '../environment';
import { UserModel, UserType } from '../models/user.model';

export function SetCORS(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
}

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

  jwt.verify(token, env.jwtAccessSecret, async (err, payload) => {
    if (err) {
      return next(
        createHttpError(403, 'unauthorized access to resource')
      );
    }
    const user = await UserModel.findById(payload.id)
    req.user = user;
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
  SetCORS,
  VerifyJwtToken,
  IsSchoolAdmin,
  IsVolunteer,
}
