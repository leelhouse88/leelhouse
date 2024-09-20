import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/model/Contact";

export async function GET(req, res) {
    await dbConnect();

    try {
        const count = await ContactModel.countDocuments({ status: "0" });
        return new Response(
            JSON.stringify({ success: true, count }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ success: false, message: "Error fetching data" }),
            { status: 500 }
        );
    }
}
