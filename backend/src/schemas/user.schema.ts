import mongoose from 'mongoose'
import { SchoolModel } from './school.schema'

const UserType = {
    SchoolAdmin: 'School Admin',
    Volunteer: 'Volunteer',
}

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    phoneNo: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, select: false },
    fullname: String,
}, { discriminatorKey: 'type' })

export const User = mongoose.model('User', userSchema)

export const SchoolAdmin = User.discriminator(
    UserType.SchoolAdmin, 
    new mongoose.Schema({
        position: String,
        staffId: String,
        school: { type: mongoose.Types.ObjectId, ref: SchoolModel.name }
    })
)
export const Volunteer = User.discriminator(
    UserType.Volunteer,
    new mongoose.Schema({
        occupation: String,
        dob: Date,
    })
)