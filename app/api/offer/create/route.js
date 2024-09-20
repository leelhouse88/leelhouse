import dbConnect from "@/lib/dbConnect";
import OfferModel from "@/model/Offer";

export async function POST(req, res) {
    await dbConnect();

    try {
        const offer = await req.json();
        const neweoffer = new OfferModel(offer);
        await neweoffer.save();

        return Response.json({
            message: "Neweoffer Register",
            success: true,
            data: { id: neweoffer._id }
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "error in Neweoffer",
            success: false
        }, { status: 500 })
    }
}