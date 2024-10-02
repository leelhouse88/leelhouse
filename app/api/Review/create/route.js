import dbConnect from "@/lib/dbConnect";
import ReviewModel from "@/model/Review";

export async function POST(req, res) {
    await dbConnect();

    try {
        const Review = await req.json();
        const newReview = new ReviewModel(Review);
        await newReview.save();

        return Response.json({
            message: "Review Register",
            success: true,
            data: { id: newReview._id }
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "error in Review Service",
            success: false
        }, { status: 500 })
    }
}