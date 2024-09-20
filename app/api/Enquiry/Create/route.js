import dbConnect from "@/lib/dbConnect";
import EnquiryModel from "@/model/Enquiry";

export async function POST(req, res) {
    await dbConnect();

    try {
        const enquiry = await req.json();
        const newenquiry = new EnquiryModel(enquiry);
        await newenquiry.save();

        return Response.json({
            message: "Enquiry Register",
            success: true,
            data: { id: newenquiry._id }
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "error in enquiry",
            success: false
        }, { status: 500 })
    }
}