import { Router } from "express";
import UserStore from "../stores/user.store";

const users = Router();

users.post(
    '/',
    async (req, res) => {
        const createdUser = await UserStore.CreateVolunteer(req.body)
        res.json({
            data: createdUser
        })
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