import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/model/AdminModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    await dbConnect();

    try {
        const fetch = await AdminModel.find({ defaultdata: "admin" });
        return NextResponse.json(
            {
                message: "All data fetched!",
                success: true,
                fetch,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error on getting data list:", error);
        return NextResponse.json(
            {
                message: "Error on getting data list!",
                success: false,
            },
            { status: 500 }
        );
    }
};
