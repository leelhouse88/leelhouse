import dbConnect from "@/lib/dbConnect";
import AddServiceModel from "@/model/Addservice";


export const DELETE = async (request, context) => {
  await dbConnect();

  try {
    const id = context.params.id;

    if (!id) {
      return Response.json(
        {
          message: "service id is required!",
          success: false,
        },
        { status: 400 }
      );
    }

    const service = await AddServiceModel.findOne({ _id: id });

    if (!service) {
      return Response.json(
        {
          message: "Received invalid service id!",
          success: false,
        },
        { status: 400 }
      );
    }

    await service.deleteOne();

    return Response.json(
      {
        message: "service deleted!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error on deleting service:", error);
    return Response.json(
      {
        message: "Error on deleting service!",
        success: false,
      },
      { status: 500 }
    );
  }
};