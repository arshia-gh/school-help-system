import { Router } from 'express';

import auth from './auth.router';
import users from './users.router';
import schools from './schools.router';
import requests from './request.router';

const main = Router();

main.use('/', auth);
main.use('/schools', schools);
main.use('/users', users);
main.use('/requests', requests);

export default main;