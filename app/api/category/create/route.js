import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/model/Category";

export async function POST(req, res) {
    await dbConnect();

    try {
        const category = await req.json();

      
        const alreadylist = await CategoryModel.findOne({
            name: category.name,
      
        });

        if (alreadylist) {
            return Response.json(
                {
                    message: "category already exists",
                    success: false,
                },
                { status: 400 }
            );
        }

    
        const newcategory = new CategoryModel(category);
        await newcategory.save();

        return Response.json({
            message: "category added successfully.",
            success: true,
            data: { id: newcategory._id },
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({
            message: "Error adding category",
            success: false,
        }, { status: 500 });
    }
}
