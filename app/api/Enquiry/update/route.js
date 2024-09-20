import dbConnect from "@/lib/dbConnect";
import EnquiryModel from "@/model/Enquiry";

export const PATCH = async (request) => {
    await dbConnect();
    try {
        const data = await request.json();

        const enquiry = await EnquiryModel.findOne({ _id: data.id });

        if (!enquiry) {
            return new Response(
                JSON.stringify({
                    message: "Received invalid enquiry id!",
                    success: false,
                }),
                { status: 404 }
            );
        }

        await EnquiryModel.updateOne(
            { _id: data.id },
            { $set: { status: "1" } }
        );

        return new Response(
            JSON.stringify({
                message: "Enquiry status updated to '1'!",
                success: true,
                enquiryid: data.id,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("Error on updating enquiry:", error);
        return new Response(
            JSON.stringify({
                message: "Error on updating enquiry!",
                success: false,
            }),
            { status: 500 }
        );
    }
};
