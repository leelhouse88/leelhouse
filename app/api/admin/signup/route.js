import AdminModel from "@/model/AdminModel";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await dbConnect();

    try {
        const {name,email,mobile,password} = await req.json();
        const alreadyuser = await AdminModel.findOne({ email });
        if (alreadyuser) {
            return Response.json(
                {
                    message: "user already exist with provided email address!",
                    success: false,
                },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createadmin = await AdminModel.create({
            name,
            mobile,
            email,
            password: hashedPassword
        })

        return Response.json({
            message: "Admin Register",
            success: true,
          
        }, { status: 201 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "error in register admin",
            success: false
        }, { status: 500 })

    }
}