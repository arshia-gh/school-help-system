import { Router } from "express";
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';
import { VerifyJwtToken } from '../middlewares/authenticate'
import env from "../environment";
import authStore from '../stores/auth.store';

const auth = Router();

auth.get(
  '/auth',
  VerifyJwtToken,
  async(req, res) => {
    res.json({ data: req.user })
  }
)

auth.post(
    '/login',
    async (req, res) => {
        const { username, password } = req.body;
        const user = await authStore.login(username, password);

        // where is the user?
        if (!user) {
            res.json(null);
        }

        // jwt black magic
        const payload = { id: user._id, username: user.username, type: user.type }
        const accessToken = jwt.sign(payload, env.jwtAccessSecret);
        res.json({
            user,
            accessToken,
        })
    }
)

export default auth;
