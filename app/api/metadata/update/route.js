import dbConnect from "@/lib/dbConnect";
import MetadataModel from "@/model/Metadata";

export const PATCH = async (request) => {
    await dbConnect();
    try {
        const data = await request.json();

        const metadata = await MetadataModel.findOne({ _id: data.id });

        if (!metadata) {
            return new Response(
                JSON.stringify({
                    message: "Received invalid metadata id!",
                    success: false,
                }),
                { status: 404 }
            );
        }

        await MetadataModel.updateOne(
            { _id: data.id },
            { $set: data }   
        );

        return new Response(
            JSON.stringify({
                message: "metadata updated!",
                success: true,
                metadataid: data.id,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("Error on updating metadata:", error);
        return new Response(
            JSON.stringify({
                message: "Error on updating metadata!",
                success: false,
            }),
            { status: 500 }
        );
    }
};
