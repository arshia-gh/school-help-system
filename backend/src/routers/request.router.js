import RequestStore from "../stores/request.store";
import { Router } from "express";
import { OfferStatus } from "../models/request.model";

const requests = Router();

requests.get(
    '/', 
    async (req, res) => {
        const { sortBy, orderBy } = req.query
        const requests = await RequestStore.All(sortBy, orderBy)
        res.json({ data: requests })
    }
)

requests.get(
    '/:id',
    async (req, res) => {
        const request = await RequestStore.Find(req.params.id);
        res.json({ data: request })
    }
)

requests.post(
    '/:id/offers',
    async (req, res) => {
        const request = await RequestStore.CreateOffer(
            req.params.id, 
            req.user, 
            req.body
        )
        
        res.json({ data: request });
    }
)

requests.get(
    '/:id/offers/:offerId',
    async (req, res) => {
        const offer = await RequestStore.FindOffer(req.params.id, req.params.offerId)
        res.json({ data: offer })
    }
)

requests.put(
    '/:id/offers/:offerId/reject',
    async (req, res) => {
        const offer = await RequestStore.ReviewOffer(
            req.params.id, 
            req.params.offerId, 
            OfferStatus.Rejected
        );

        res.json({ data: offer })
    }
)

requests.put(
    '/:id/offers/:offerId/accept',
    async (req, res) => {
        const offer = await RequestStore.ReviewOffer(
            req.params.id, 
            req.params.offerId, 
            OfferStatus.Accepted
        );
        
        res.json({ data: offer })
    }
)

requests.put(
    '/:id/close',
    async (req, res) => {
        const request = await RequestStore.CloseRequest(req.params.id);
        res.json({ data: request })
    }
)


export default requests