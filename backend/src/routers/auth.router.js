import { Router } from "express";
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';

import env from "../environment";
import authStore from '../stores/auth.store';

const auth = Router();

auth.post(
    '/login',
    async (req, res) => {
        const { username, password } = req.body;
        const user = await authStore.login(username, password);

        // where is the user?
        if (!user) {
            throw createHttpError(401, 'bad credentials');
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