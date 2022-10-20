import { IVolunteer } from "./user.types";

export enum OfferType {
    Pending = 'Pending',
    Rejected = 'Rejected',
    Accepted = 'Accepted',
}

export interface IOffer {
    remarks: string
    createdAt: Date
    updatedAt: Date
    reviewedAt: Date
    status: OfferType
    submittedBy?: IVolunteer
} 