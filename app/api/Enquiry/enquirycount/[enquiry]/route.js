import dbConnect from "@/lib/dbConnect";
import EnquiryModel from "@/model/Enquiry";

export async function GET(req, res) {
    await dbConnect();

    try {
        const count = await EnquiryModel.countDocuments({ status: "0" });
        return new Response(
            JSON.stringify({ success: true, count }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ success: false, message: "Error fetching enquiries" }),
            { status: 500 }
        );
    }
}
