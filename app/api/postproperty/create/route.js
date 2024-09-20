import dbConnect from "@/lib/dbConnect";
import PostPropertyModel from "@/model/PostProperty";

export async function POST(req, res) {
    await dbConnect();

    try {
        const enquiry = await req.json();
        const newenquiry = new PostPropertyModel(enquiry);
        await newenquiry.save();

        return Response.json({
            message: "Property Register",
            success: true,
            data: { id: newenquiry._id }
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "error in Property Service",
            success: false
        }, { status: 500 })
    }
}