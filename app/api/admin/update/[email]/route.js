import AdminModel from "@/model/AdminModel";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
export async function PATCH(req) {
    await dbConnect();

    try {
        console.log(req)
        const { name, email, mobile, password, usertype } = await req.json();
        const user = await AdminModel.findOne({ email: email });
        console.log(email);

        if (!user) {
            return new Response(
                JSON.stringify({
                    message: "User not found with the provided email!",
                    success: false,
                }),
                { status: 404 }
            );
        }

        const updates = { name, email, mobile, usertype };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        await AdminModel.updateOne({ email: email }, { $set: updates });

        return new Response(
            JSON.stringify({
                message: "User updated successfully",
                success: true,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({
                message: "Error updating user",
                success: false,
            }),
            { status: 500 }
        );
    }
}
