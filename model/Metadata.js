import mongoose, { Schema } from "mongoose";

const MetadataSchema = new Schema(
    {
        page: { type: String },
        title: { type: String },
        description: { type: String },
        defaultdata:{type:String,required:true,default:"metadata"}


    },
    { timestamps: true }
);

const MetadataModel =
    mongoose.models.metadata2 || mongoose.model("metadata2", MetadataSchema);

export default MetadataModel