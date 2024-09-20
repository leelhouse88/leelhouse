import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Property";

export async function GET(request, context) {
  await dbConnect();

  try {
    const { id } = context.params;

    // Find the project by ID
    const project = await ProjectModel.findById(id);

    // Check if no project was found
    if (!project) {
      return new Response(
        JSON.stringify({
          message: "No project found with this ID!",
          success: false,
        }),
        { status: 404 }
      );
    }

    // Return the found project
    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    console.error("Error on getting project:", error);
    return new Response(
      JSON.stringify({
        message: "Error on getting project!",
        success: false,
      }),
      { status: 500 }
    );
  }
}
