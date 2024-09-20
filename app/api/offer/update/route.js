import dbConnect from "@/lib/dbConnect";
import OfferModel from "@/model/Offer";

export const PATCH = async (request) => {
    await dbConnect();
    try {
        const data = await request.json();

        const offer = await OfferModel.findOne({ _id: data.id });

        if (!offer) {
            return new Response(
                JSON.stringify({
                    message: "Received invalid offer id!",
                    success: false,
                }),
                { status: 404 }
            );
        }

        await OfferModel.updateOne(
            { _id: data.id },
            { $set: data }   
        );

        return new Response(
            JSON.stringify({
                message: "offer updated!",
                success: true,
                offerid: data.id,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("Error on updating offer:", error);
        return new Response(
            JSON.stringify({
                message: "Error on updating offer!",
                success: false,
            }),
            { status: 500 }
        );
    }
};
