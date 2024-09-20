import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Property";

export const GET = async (request) => {
    await dbConnect();
  
    try {
    
      const cities = await ProjectModel.distinct("location");
      return Response.json(
        {
          message: "All cities fetched!",
          success: true,
          cities,
        },
        { status: 200 }
      );
    } catch (error) {
      console.log("Error on getting city list:", error);
      return Response.json(
        {
          message: "Error on getting city list!",
          success: false,
        },
        { status: 500 }
      );
    }
  };
