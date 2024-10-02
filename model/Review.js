import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
    {

        projectid: { type: String },
        name: { type: String, required: true },
        email: { type: String, required: true },
        review: { type: String, required: true },
        defaultdata: { type: String, required: true, default: "Review" }

    },
    { timestamps: true }
);

const ReviewModel =
    mongoose.models.Review1 || mongoose.model("Review1", ReviewSchema);

export default ReviewModel