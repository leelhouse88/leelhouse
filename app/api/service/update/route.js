import dbConnect from "@/lib/dbConnect";
import ServiceModel from "@/model/Service";

export const PATCH = async (request) => {
    await dbConnect();
    try {
        const data = await request.json();

        // Validate service ID
        if (!data.id) {
            return new Response(
                JSON.stringify({
                    message: "Service ID is required!",
                    success: false,
                }),
                { status: 400 }
            );
        }

        const service = await ServiceModel.findById(data.id);

        if (!service) {
            return new Response(
                JSON.stringify({
                    message: "Received invalid service ID!",
                    success: false,
                }),
                { status: 404 }
            );
        }

        // Avoid updating the _id field
        const { id, ...updates } = data;

        // Update the service with selective fields
        const updatedService = await ServiceModel.findByIdAndUpdate(id, { $set: updates }, { new: true });

        return new Response(
            JSON.stringify({
                message: "Service updated successfully!",
                success: true,
                serviceid: updatedService._id,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating service:", error);
        return new Response(
            JSON.stringify({
                message: "Error updating service!",
                success: false,
            }),
            { status: 500 }
        );
    }
};
