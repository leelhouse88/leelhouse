import dbConnect from "@/lib/dbConnect";
import WishlistModel from "@/model/Wishlist";

export async function POST(req, res) {
    await dbConnect();

    try {
        const wishlist = await req.json();

        // Check if a wishlist item with the same userid and productid already exists
        const alreadylist = await WishlistModel.findOne({
            userid: wishlist.userid,
            productid: wishlist.productid,
        });

        if (alreadylist) {
            return Response.json(
                {
                    message: "Wishlist item already exists for this user and product.",
                    success: false,
                },
                { status: 400 }
            );
        }

        // Create and save the new wishlist item
        const newwishlist = new WishlistModel(wishlist);
        await newwishlist.save();

        return Response.json({
            message: "Wishlist item added successfully.",
            success: true,
            data: { id: newwishlist._id },
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({
            message: "Error adding wishlist item.",
            success: false,
        }, { status: 500 });
    }
}
