import createHttpError from "http-errors";
import { OfferModel, OfferStatus, RequestModel, RequestStatus, RequestType, ResourceModel, TutorialModel } from "../models/request.model";
import SchoolStore from "./school.store";

export async function All(sortBy, orderBy = 'desc') {
    const requests = RequestModel.find()
    if (sortBy) requests.sort({ sortBy: orderBy })
    
    return requests;
}

export async function FindSchoolRequests(schoolId, sortBy, orderBy = "desc") {
    const school = await SchoolStore.Find(schoolId);
    
    const requests = RequestModel.find({ school })
    if (sortBy) requests.sort({ sortBy: orderBy })
    
    return requests;
}

export async function Find(requestId) {
    const request = await RequestModel.findById(requestId)
    if (!request) throw createHttpError(404, `request with id of ${id} was not found`);
    return request;
}

export async function Create(schoolId, admin, input) {
    const school = await SchoolStore.Find(schoolId);
    
    const model = input.type === RequestType.Resource ? ResourceModel : TutorialModel

    return model.create({
        ...input,
        submittedBy: admin,
        school
    })
}

export async function CreateOffer(requestId, volunteer, input) {
    const request = await Find(requestId);
    const offer = new OfferModel({ ...input, submittedBy: volunteer });
    request.offers.push(offer);

    return request.save()
}

export async function FindOffer(requestId, offerId) {
    const request = await Find(requestId);
    const foundOffer = request.offers.find(offer => offer.id === offerId);
    if (!foundOffer) {
        throw createHttpError(404, `Offer with id of ${offerId} was not found`)
    }
    return foundOffer;
}

export async function ReviewOffer(requestId, offerId, status) {
    const offer = await FindOffer(requestId, offerId);

    if (offer.status !== OfferStatus.Pending) {
        throw createHttpError(400, 'to review an offer its status must be pending');
    }

    // to be updated

    return offer;
}


export async function CloseRequest(requestId) {
    const request = await Find(requestId);
    return RequestModel.findByIdAndUpdate(
        request.id, 
        { status: RequestStatus.Old, reviewedAt: new Date() },
        { new: true }
    );
}

export default {
    FindSchoolRequests,
    Create,
    CreateOffer,
    Find,
    FindOffer,
    ReviewOffer,
    CloseRequest,
    All,
}