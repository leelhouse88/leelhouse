import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
    {

        name: { type: String },
        img: { type: String },
        details: { type: String },
        defaultdata: { type: String, required: true, default: "category" }

    },
    { timestamps: true }
);

const CategoryModel =
    mongoose.models.category3 || mongoose.model("category3", CategorySchema);

export default CategoryModel