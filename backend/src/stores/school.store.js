import createHttpError from "http-errors";

import { SchoolModel } from "../models/school.model";
import { SchoolAdminModel } from "../models/user.model";
import utils from "../utils";

export function Create(data) {
    return SchoolModel.create(data);
}

export function All() {
    return SchoolModel.find();
}

export async function Find(id) {
    const school = await SchoolModel.findById(id);
    if (!school) throw createHttpError(404, `school with id of ${id} was not found`);
    return school;
}

export async function CreateAdmin(schoolId, input) {
    const school = await Find(schoolId);
    const { password, ...data } = input;
    return SchoolAdminModel.create({
        ...data,
        school,
        password: await utils.hashPassword(password)
    });
}

export async function AllAdmins(schoolId, input) {
    const school = await Find(schoolId);
    return SchoolAdminModel.find({ school })
}

export default {
    Create,
    All,
    Find,
    CreateAdmin,
    AllAdmins,
}
