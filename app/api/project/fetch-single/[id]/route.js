import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Property";


export const GET = async (request, context) => {
  await dbConnect();

  try {
    const id = context.params.id;
    const project = await ProjectModel.findById(id);

    if (!project) {
      return Response.json(
        {
          message: "Project not found!",
          success: false,
        },
        { status: 404 }
      );
    }

    return Response.json(


      { project: project },

      { status: 200 }
    );
  } catch (error) {
    console.log("Error on getting Project:", error);
    return Response.json(
      {
        message: "Error on getting Project!",
        success: false,
      },
      { status: 500 }
    );
  }
};
