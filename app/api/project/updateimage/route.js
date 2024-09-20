import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Property";

export const PATCH = async (request) => {
    await dbConnect();
    try {
        const data = await request.json();
        const { id, featureImage, images, deleteFeatureImageIndex, deleteImageIndex } = data;

        const project = await ProjectModel.findOne({ _id: id });

        if (!project) {
            return new Response(
                JSON.stringify({
                    message: "Received invalid Project id!",
                    success: false,
                }),
                { status: 404 }
            );
        }

        // Handle deleting single image from featureImage array
        if (deleteFeatureImageIndex !== undefined && deleteFeatureImageIndex >= 0) {
            project.featureImage = project.featureImage.filter((_, index) => index !== deleteFeatureImageIndex);
        }

        // Handle deleting single image from images array
        if (deleteImageIndex !== undefined && deleteImageIndex >= 0) {
            project.images = project.images.filter((_, index) => index !== deleteImageIndex);
        }

        // Update feature images with any new additions
        if (featureImage && featureImage.length > 0) {
            project.featureImage = [...project.featureImage, ...featureImage];
        }

        // Update additional images with any new additions
        if (images && images.length > 0) {
            project.images = [...project.images, ...images];
        }

        // Save the updated project
        await project.save();

        return new Response(
            JSON.stringify({
                message: "Project updated!",
                success: true,
                projectid: id,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("Error on updating project:", error);
        return new Response(
            JSON.stringify({
                message: "Error on updating project!",
                success: false,
            }),
            { status: 500 }
        );
    }
};
