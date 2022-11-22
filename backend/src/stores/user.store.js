import createHttpError from "http-errors";
import { 
    SchoolAdminModel,
    UserModel,
    UserType,
    VolunteerModel,
} from "../models/user.model";
import utils, { hashPassword } from '../utils';

export const PW_ENCRYPT_ROUND = 10;

export async function FindByUsername(username) {
    const user = await UserModel.findOne({ username });
    if (!user) throw createHttpError(404, `user with username of ${username} was not found`);
    return user;
}

export async function Update(username, input) {
    const updatingFields = {  
        fullname: input.fullname, 
        email: input.email, 
        phone: input.phone,
        staffId: input.staffId,
        position: input.position 
    };

    // hash the new password
    const { password } = input;
    if (password) {
        updatingFields.password = await hashPassword(password)
    }

    // remove undefined values
    Object.keys(updatingFields).forEach(
        k => updatingFields[k] == null && delete updatingFields[k]
    )

    const user = await FindByUsername(username);

    // allow only admins to update their profiles
    if (user.type !== UserType.SchoolAdmin) {
        createHttpError(403, 'only school admins are allowed to update their profile')
    }

    return SchoolAdminModel.findOneAndUpdate(
        { username: user.username }, 
        updatingFields,
        // return the updated document
        { new: true }
    );  
}

export async function CreateVolunteer(input) {
    const { password, ...data } = input;
    return VolunteerModel.create({ 
        ...data,
        password: await utils.hashPassword(password) 
    });
}

export default {
    CreateVolunteer,
    Update,
    FindByUsername,
}