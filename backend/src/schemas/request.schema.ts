import mongoose from "mongoose";

import { SchoolModel } from "./school.schema";
import { SchoolAdmin, Volunteer } from "./user.schema";

export const OfferStatus = {
    Pending: 'Pending',
    Accepted: 'Accepted',
    Rejected: 'Rejected',
}

export const RequestStatus = {
    New: 'New',
    Closed: 'Closed',
}

export const RequestType = {
    Tutorial: 'Tutorial',
    Resource: 'Resource',
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

export function isTutorial(request: any) {
    return request.type === RequestType.Tutorial
}

export function isResource(request: any) {
    return request.type === RequestType.Resource
}

const OfferSchema = new mongoose.Schema({
    reviewedAt: Date,
    remarks: { type: String, enum: OfferStatus, default: OfferStatus.Pending },
    submittedBy: { type: mongoose.Types.ObjectId, ref: Volunteer.modelName },
}, { timestamps: true })

const RequestSchema = new mongoose.Schema({
    title: String,
    description: String,
    reviewedAt: Date,
    status: { type: String, enum: RequestStatus, default: RequestStatus.New },
    submittedBy: { type: mongoose.Types.ObjectId, ref: SchoolAdmin.modelName },
    school: { type:mongoose.Types.ObjectId, ref: SchoolModel.modelName },
    offers: { type: [OfferSchema], default: [] },
}, { discriminatorKey: 'type', timestamps: true })

export const TutorialSchema = new mongoose.Schema({
    proposedDateTime: Date,
    numOfStudents: Number,
    studentLevel: { type: String, enum: StudentLevel },
})

export const ResourceSchema =  new mongoose.Schema({
    numRequired: Number,
    resourceType: { type: String, enum: ResourceType },
})


export const RequestModel = mongoose.model('Request', RequestSchema)

export const TutorialModel = RequestModel.discriminator(
    RequestType.Tutorial,
    TutorialSchema,
)

export const ResourceModel = RequestModel.discriminator(
    RequestType.Resource,
    ResourceSchema,
)