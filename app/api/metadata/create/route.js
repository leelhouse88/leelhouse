import dbConnect from "@/lib/dbConnect";
import MetadataModel from "@/model/Metadata";

export async function POST(req, res) {
    await dbConnect();

    try {
        const metadata = await req.json();
        const newmetadata = new MetadataModel(metadata);
        await newmetadata.save();

        return Response.json({
            message: "metadata Register",
            success: true,
            data: { id: newmetadata._id }
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "error in metadata",
            success: false
        }, { status: 500 })
    }
}