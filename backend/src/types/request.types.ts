import { IOffer } from "./offer.types"
import { ISchool } from "./school.types"
import { ISchoolAdmin } from "./user.types"

export enum ResourceType {
    MobileDevice = "MobileDevice",
    PersonalComputer = "PersonalComputer",
    NetworkingEquipment = "NetworkingEquipment",
}

export enum StudentLevel {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced",
}

export enum RequestStatus {
    New = 'New',
    Closed = 'Closed',
}

export enum RequestType {
    Tutorial = "Tutorial",
    Resource = "Resource",
}

export interface ISimpleRequest {
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
    status: RequestStatus

    submittedBy?: ISchoolAdmin
    school: ISchool

    reviewedAt: Date
    acceptedOffer: IOffer
    offers: IOffer[]
}

export interface ITutorial extends ISimpleRequest {
    proposedDateTime: Date
    studentLevel: StudentLevel
    numOfStudents: number
    type: RequestType.Tutorial
}

export interface IResource extends ISimpleRequest {
    numRequired: number
    resourceType: ResourceType
    type: RequestType.Resource
}

export type IRequest = ISimpleRequest & (ITutorial | IResource)

export const isTutorial = (request: IRequest): request is ITutorial => 
    request.type === RequestType.Tutorial

export const isResource = (request: IRequest): request is IResource => 
    request.type === RequestType.Resource