import mongoose, { Schema } from "mongoose";

const ContactSchema = new Schema(
    {
       
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        message: { type: String },
        status: { type: String,enum:["1","0"], required: true, default: "0" },
        defaultdata:{type:String,required:true,default:"contact"}
        
    },
    { timestamps: true }
);

const ContactModel =
    mongoose.models.contactus4 || mongoose.model("contactus4", ContactSchema);

export default ContactModel