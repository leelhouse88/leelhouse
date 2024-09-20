import mongoose, { Schema } from "mongoose";

const PostPropertySchema = new Schema(
    {
        propertytype: { type: String },
        purpose: { type: String },
        mobileNumber: { type: String },
        name: { type: String },
        city: { type: String },
        defaultdata: { type: String,required:true,default:"property" },
    },
    { timestamps: true }
);

const PostPropertyModel =
    mongoose.models.postproperty2 || mongoose.model("postproperty2", PostPropertySchema);

export default PostPropertyModel