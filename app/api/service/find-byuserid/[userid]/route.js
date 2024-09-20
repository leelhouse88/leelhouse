import dbConnect from "@/lib/dbConnect";
import ServiceModel from "@/model/Service";

export async function GET(request, context) {
  await dbConnect();

  try {
    const userid = context.params.userid;

    // Find all service items with the same email ID
    const serviceItems = await ServiceModel.find({ userid: userid });

    // Check if no service items were found
    if (serviceItems.length === 0) {
      return new Response(
        JSON.stringify({
          message: "No service  found for this user!",
          success: false,
        }),
        { status: 404 }
      );
    }

    // Return the found service items
    return new Response(JSON.stringify(serviceItems), { status: 200 });
  } catch (error) {
    console.log("Error on getting service", error);
    return new Response(
      JSON.stringify({
        message: "Error on getting service",
        success: false,
      }),
      { status: 500 }
    );
  }
}
