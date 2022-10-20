import bcrypt from 'bcrypt'
import { IUser, isSchoolAdmin } from "src/types";
import { SchoolAdmin, User, Volunteer } from "src/schemas";
import { Request } from 'express';

export class UsersController {
    public static PW_ENCRYPT_ROUND = 12

    async create(req: Request) {
        const data = req.body as IUser
        const hashedPassword = await bcrypt.hash(data.password, UsersController.PW_ENCRYPT_ROUND)
        const userModel = isSchoolAdmin(data) ? SchoolAdmin : Volunteer
        console.log(data)
        return new userModel({ ...data, password: hashedPassword }).save()
    }

    static EmailsController = class {
        findOne(req: Request) { return User.exists({ email: req.params.email }) }
    }

    static UsernamesController = class {
        findOne(req: Request) { return User.exists({ username: req.params.username }) }
    }
}