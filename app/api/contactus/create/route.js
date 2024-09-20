import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/model/Contact";

export async function POST(req, res) {
    await dbConnect();

    try {
        const enquiry = await req.json();
        const newenquiry = new ContactModel(enquiry);
        await newenquiry.save();

        return Response.json({
            message: "Enquiry Register",
            success: true,
            data: { id: newenquiry._id }
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "error in Enquiry Service",
            success: false
        }, { status: 500 })
    }
}