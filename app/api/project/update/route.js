import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Property";

export const PATCH = async (request) => {
    await dbConnect();
    try {
        const data = await request.json();

        const project = await ProjectModel.findOne({ _id: data.id });

        if (!project) {
            return new Response(
                JSON.stringify({
                    message: "Received invalid Project id!",
                    success: false,
                }),
                { status: 404 }
            );
        }

        await ProjectModel.updateOne(
            { _id: data.id },
            { $set: data }   
        );

        return new Response(
            JSON.stringify({
                message: "Project updated!",
                success: true,
                projectid: data.id,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("Error on updating project:", error);
        return new Response(
            JSON.stringify({
                message: "Error on updating project!",
                success: false,
            }),
            { status: 500 }
        );
    }
};
