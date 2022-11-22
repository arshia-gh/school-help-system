import mongoose from 'mongoose'
import utils from '../utils'
import { SchoolModel } from './school.model'

export const UserType = {
    SchoolAdmin: 'SchoolAdmin',
    Volunteer: 'Volunteer',
}

export function isSchoolAdmin(user) {
    return user?.type === UserType.SchoolAdmin
} 

export function isVolunteer(user) {
    return user?.type === UserType.Volunteer
} 

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    phoneNo: { type: String, unique: true },
    fullname: String,
}, { discriminatorKey: 'type' })

UserSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret['password']
        return utils.toMongooseJson(ret);
    }
})

const SchoolAdminSchema = new mongoose.Schema({
    position: String,
    staffId: String,
    school: { type: mongoose.Types.ObjectId, ref: SchoolModel.modelName },
})

const VolunteerSchema = new mongoose.Schema({
    occupation: String,
    dob: Date,
})

export const UserModel = mongoose.model('User', UserSchema)
export const SchoolAdminModel  = UserModel.discriminator(UserType.SchoolAdmin, SchoolAdminSchema)
export const VolunteerModel = UserModel.discriminator(UserType.Volunteer, VolunteerSchema)