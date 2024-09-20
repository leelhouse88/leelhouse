import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/model/Category";


export const DELETE = async (request, context) => {
  await dbConnect();

  try {
    const id = context.params.id;

    if (!id) {
      return Response.json(
        {
          message: "category id is required!",
          success: false,
        },
        { status: 400 }
      );
    }

    const category = await CategoryModel.findOne({ _id: id });

    if (!category) {
      return Response.json(
        {
          message: "Received invalid category id!",
          success: false,
        },
        { status: 400 }
      );
    }

    await category.deleteOne();

    return Response.json(
      {
        message: "category deleted!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error on deleting category:", error);
    return Response.json(
      {
        message: "Error on deleting category!",
        success: false,
      },
      { status: 500 }
    );
  }
};