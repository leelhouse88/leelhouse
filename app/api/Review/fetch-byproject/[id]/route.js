import dbConnect from "@/lib/dbConnect";
import ReviewModel from "@/model/Review";

export const GET = async (request, { params }) => {
    await dbConnect();

    const { id } = params; // Get the 'id' from the URL params

    try {
        const fetch = await ReviewModel.find({ projectid: id }); // Find all documents where 'id' matches

        if (!fetch || fetch.length === 0) {
            return new Response(
                JSON.stringify({
                    message: "No projects found with the given id!",
                    success: false,
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Projects fetched!",
                success: true,
                fetch,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("Error on getting projects:", error);
        return new Response(
            JSON.stringify({
                message: "Error on getting projects!",
                success: false,
            }),
            { status: 500 }
        );
    }
};
