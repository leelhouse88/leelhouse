import dbConnect from "@/lib/dbConnect";
import AddServiceModel from "@/model/Addservice";

export async function POST(req, res) {
    await dbConnect();

    try {
        const service = await req.json();
        const newservice = new AddServiceModel(service);
        await newservice.save();

        return Response.json({
            message: "Service Register",
            success: true,
            data: { id: newservice._id }
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "error in register Service",
            success: false
        }, { status: 500 })
    }
}