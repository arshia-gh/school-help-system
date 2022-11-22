import mongoose from "mongoose";
import utils from "../utils";

const AddressSchema = new mongoose.Schema({
    city: String,
    state: String,
    street: String,
}, { _id: false })

const SchoolSchema = new mongoose.Schema({
    name: String,
    address: AddressSchema
})

SchoolSchema.set('toJSON', {
    transform: (_, ret) => utils.toMongooseJson(ret)
})

export const SchoolModel = mongoose.model('School', SchoolSchema)