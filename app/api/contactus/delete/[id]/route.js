import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/model/Contact";


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

    const request = await ContactModel.findOne({ _id: id });

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
        message: "request deleted!",
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