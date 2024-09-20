import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/model/Contact";

export const PATCH = async (request) => {
    await dbConnect();
    try {
        const data = await request.json();

        const contact = await ContactModel.findOne({ _id: data.id });

        if (!contact) {
            return new Response(
                JSON.stringify({
                    message: "Received invalid contact id!",
                    success: false,
                }),
                { status: 404 }
            );
        }

        await ContactModel.updateOne(
            { _id: data.id },
            { $set: { status: "1" } }
        );

        return new Response(
            JSON.stringify({
                message: "contact status updated to '1'!",
                success: true,
                contactid: data.id,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("Error on updating contact:", error);
        return new Response(
            JSON.stringify({
                message: "Error on updating contact!",
                success: false,
            }),
            { status: 500 }
        );
    }
};
