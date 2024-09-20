import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Property";

export async function POST(req,res) {
    await dbConnect();

    try {
        const project = await req.json();
        const newproject = new ProjectModel(project);
        await newproject.save();

        return Response.json({
            message: "Property Register",
            success: true,
            data: { id: newproject._id }
        }, { status: 201 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "error in register project",
            success: false
        }, { status: 500 })
    }
}