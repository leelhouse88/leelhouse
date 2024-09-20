import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/model/Contact";

export const GET = async (request) => {
    await dbConnect();

    try {
        const fetch = await ContactModel.find({ defaultdata: "contact" });
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
