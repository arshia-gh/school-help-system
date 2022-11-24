import { Router } from 'express';
import { VerifyJwtToken } from '../middlewares/authenticate';
import RequestStore from '../stores/request.store';

import SchoolStore from '../stores/school.store';

const schools = Router();

schools.post(
  '/',
  async (req, res) => {
    const school = await SchoolStore.Create(req.body);

    res.json({
      data: school,
    })
  }
)

schools.get(
  '/',
  async (req, res) => {
    const schools = await SchoolStore.All();

    res.json({
      data: schools,
    })
  }
)

schools.get(
  '/:id',
  async (req, res) => {
    const school = await SchoolStore.Find(req.params.id);

    res.json({
      data: school
    })
  }
)

schools.post(
  '/:id/admins',
  async (req, res) => {
    try {
      const admin = await SchoolStore.CreateAdmin(req.params.id, req.body);
      res.json({ data: admin });
    }
    catch (err) {
      res.json({
        data: {
          error: {
            code: 11000, //duplicate
            duplicatedFields: Object.keys(err.keyValue) //return the duplicated key
          }
        }
      })
    }
  }
);

schools.get(
  '/:id/admins',
  async (req, res) => {
    const admins = await SchoolStore.AllAdmins(req.params.id);
    res.json({ data: admins })
  }
)

schools.get(
  '/:id/requests',
  async (req, res) => {
    const requests = await RequestStore.FindSchoolRequests(req.params.id)
    res.json({ data: requests })
  }
)

schools.post(
  '/:id/requests',
  VerifyJwtToken,
  async (req, res) => {
    const createdRequest = await RequestStore.Create(
      req.params.id,
      req.user,
      req.body
    )
    res.json({ data: createdRequest })
  }
)

export default schools;
