import dbConnect from "@/lib/dbConnect";
import WishlistModel from "@/model/Wishlist";

export async function GET(request, context) {
  await dbConnect();

  try {
    const userid = context.params.userid;

    // Find all wishlist items with the same email ID
    const wishlistItems = await WishlistModel.find({ userid: userid });

    // Check if no wishlist items were found
    if (wishlistItems.length === 0) {
      return new Response(
        JSON.stringify({
          message: "No wishlist items found for this user!",
          success: false,
        }),
        { status: 404 }
      );
    }

    // Return the found wishlist items
    return new Response(JSON.stringify(wishlistItems), { status: 200 });
  } catch (error) {
    console.log("Error on getting wishlist items:", error);
    return new Response(
      JSON.stringify({
        message: "Error on getting wishlist items!",
        success: false,
      }),
      { status: 500 }
    );
  }
}
