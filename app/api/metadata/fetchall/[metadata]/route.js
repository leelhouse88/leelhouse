import dbConnect from "@/lib/dbConnect";
import MetadataModel from "@/model/Metadata";

export const GET = async (request) => {
    await dbConnect();

    try {
        const fetch = await MetadataModel.find({ defaultdata: "metadata" });
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
