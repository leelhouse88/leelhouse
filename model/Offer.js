import mongoose, { Schema } from "mongoose";

const OfferSchema = new Schema(
    {
        type: {
            type: String,
        },
        productid: {
            type: String
        },
        defaultdata: { type: String, required: true, default: "offer" }
    },
    { timestamps: true }
);

const OfferModel =
    mongoose.models.offer1 || mongoose.model("offer1", OfferSchema);

export default OfferModel