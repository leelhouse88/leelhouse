import mongoose, { Schema } from "mongoose";

const AddServiceSchema = new Schema(
    {

        title: { type: String },
        description:{type:String},
        imageUrl:{type:String},
        defaultdata: { type: String, required: true, default: "addservice" }

    },
    { timestamps: true }
);

const AddServiceModel =
    mongoose.models.AddService4 || mongoose.model("AddService4", AddServiceSchema);

export default AddServiceModel