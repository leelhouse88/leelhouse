import dbConnect from "@/lib/dbConnect";
import ServiceModel from "@/model/Service";

export const GET = async (request) => {
    await dbConnect();
  
    try {
     const fetch = await ServiceModel.find({ defaultdata:"service" });

      return Response.json(
        {
          message: "All data fetched!",
          success: true,
          fetch,
        },
        { status: 200 }
      );
    } catch (error) {
      console.log("Error on getting data list:", error);
      return Response.json(
        {
          message: "Error on getting data list!",
          success: false,
        },
        { status: 500 }
      );
    }
  };
  