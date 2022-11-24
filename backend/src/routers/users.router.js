import { Router } from "express";
import UserStore from "../stores/user.store";

const users = Router();

users.post(
  '/',
  async (req, res) => {

    try {
      const createdUser = await UserStore.CreateVolunteer(req.body);
      res.json({
        data: createdUser
      })
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

users.get(
  '/:username',
  async (req, res) => {
    const user = await UserStore.FindByUsername(req.params.username);
    res.json({ data: user })
  }
)

users.patch(
  '/:username',
  async (req, res) => {
    const updatedUser = await UserStore.Update(req.params.username, req.body)
    res.json({ data: updatedUser })
  }
)

export default users;
