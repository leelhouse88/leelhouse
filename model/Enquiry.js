import mongoose, { Schema } from "mongoose";

const EnquirySchema = new Schema(
    {
        name: {type: String,},
        phone: {type: Number},
        email: {type: String},
        message: {type: String},
        projectid: {type: String},
        projecttitle:{type:String},
        status: { type: String,enum:["1","0"], required: true, default: "0" },
        defaultdata: { type: String, required: true, default: "enquiry" }
    },
    { timestamps: true }
);

const EnquiryModel =
    mongoose.models.enquiry7 || mongoose.model("enquiry7", EnquirySchema);

export default EnquiryModel