import mongoose, { Schema } from "mongoose";

const WishlistSchema = new Schema(
    {

        userid: { type: String },
        productid: { type: String },
        defaultdata: { type: String, required: true, default: "wishlist" }

    },
    { timestamps: true }
);

const WishlistModel =
    mongoose.models.Wishlist1 || mongoose.model("Wishlist1", WishlistSchema);

export default WishlistModel