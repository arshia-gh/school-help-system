import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    city: String,
    state: String,
    street: String,
}, { _id: false })

const SchoolSchema = new mongoose.Schema({
    name: String,
    address: AddressSchema
})

export const SchoolModel = mongoose.model('School', SchoolSchema)