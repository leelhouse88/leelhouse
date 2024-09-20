import dbConnect from "@/lib/dbConnect";
import OfferModel from "@/model/Offer";


export const DELETE = async (request, context) => {
  await dbConnect();

  try {
    const id = context.params.id;

    if (!id) {
      return Response.json(
        {
          message: "offer id is required!",
          success: false,
        },
        { status: 400 }
      );
    }

    const offer = await OfferModel.findOne({ _id: id });

    if (!offer) {
      return Response.json(
        {
          message: "Received invalid offer id!",
          success: false,
        },
        { status: 400 }
      );
    }

    await offer.deleteOne();

    return Response.json(
      {
        message: "offer deleted!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error on deleting offer:", error);
    return Response.json(
      {
        message: "Error on deleting offer!",
        success: false,
      },
      { status: 500 }
    );
  }
};