import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Property";


export const DELETE = async (request, context) => {
  await dbConnect();

  try {
    const id = context.params.id;

    if (!id) {
      return Response.json(
        {
          message: "request id is required!",
          success: false,
        },
        { status: 400 }
      );
    }

    const request = await ProjectModel.findOne({ _id: id });

    if (!request) {
      return Response.json(
        {
          message: "Received invalid request id!",
          success: false,
        },
        { status: 400 }
      );
    }

    await request.deleteOne();

    return Response.json(
      {
        message: "Project deleted!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error on deleting request:", error);
    return Response.json(
      {
        message: "Error on deleting request!",
        success: false,
      },
      { status: 500 }
    );
  }
};