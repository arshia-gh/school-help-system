import mongoose from "mongoose"
import utils from "../utils"

import { SchoolModel } from "./school.model"
import { SchoolAdminModel, VolunteerModel } from "./user.model"

export const RequestType = {
    Tutorial: 'Tutorial',
    Resource: 'Resource',
}

export const RequestStatus = {
    New: 'New',
    Old: 'Old',
}

export const StudentLevel = {
    Beginner: 'Beginner',
    Intermediate: 'Intermediate',
    Advanced: 'Advanced',
}

export const ResourceType = {
    MobileDevice: 'Mobile Device',
    NetworkingEquipment: 'Networking Equipment',
    PersonalComputer: 'Personal Computer',
}

export const OfferStatus = {
    Rejected: 'Rejected',
    Accepted: 'Accepted',
    Pending: 'Pending'
}

const OfferSchema = new mongoose.Schema({
    reviewedAt: Date,
    status: { type: String, enum: OfferStatus, default: OfferStatus.Pending },
    remarks: String,
    submittedBy: { type: mongoose.Types.ObjectId, ref: VolunteerModel.modelName },
}, { timestamps: true })

OfferSchema.set('toJSON', {
  transform: (_, ret) => utils.toMongooseJson(ret)
})

const RequestSchema = new mongoose.Schema({
    title: String,
    description: String,
    reviewedAt: { type: Date, default: null },
    status: { type: String, enum: RequestStatus, default: RequestStatus.New },
    submittedBy: { type: mongoose.Types.ObjectId, ref: SchoolAdminModel.modelName },
    school: { type:mongoose.Types.ObjectId, ref: SchoolModel.modelName },
    offers: { type: [OfferSchema], default: [] },
}, { discriminatorKey: 'type', timestamps: true })

RequestSchema.set('toJSON', {
    transform: (_, ret) => utils.toMongooseJson(ret)
})

const TutorialSchema = new mongoose.Schema({
    proposedDateTime: Date,
    numOfStudent: Number,
    studentLevel: { type: String, enum: StudentLevel },
})

const ResourceSchema = new mongoose.Schema({
    numRequired: Number,
    resourceType: { type: String, enum: ResourceType },
})

export const OfferModel = mongoose.model('Offer', OfferSchema)
export const RequestModel = mongoose.model('Request', RequestSchema)
export const TutorialModel = RequestModel.discriminator(RequestType.Tutorial, TutorialSchema)
export const ResourceModel = RequestModel.discriminator(RequestType.Resource, ResourceSchema)
