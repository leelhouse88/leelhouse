import mongoose, { Schema } from "mongoose";
import moment from "moment";

const ServiceSchema = new Schema(
    {
        userid: { type: String, required: true },
        name: { type: String },
        mobile: { type: Number },
        city: { type: String },
        servicetype: { type: String },
        address: { type: String },
        description: { type: String },
        date: { type: String },
        time: { type: String },
        status: {
            type: String,
            required: true,
            enum: ["Completed", "In Progress", "Scheduled", "Pending", "Cancelled"],
            default: "Pending"
        },
        defaultdata: { type: String, required: true, default: "service" }
    },
    { timestamps: true }
);


ServiceSchema.pre("save", function (next) {
    // Format date to dd-mm-yyyy
    this.date = moment(this.date).format("DD-MM-YYYY");

    // Format time to hh:mm
    this.time = moment(this.time, "HH:mm").format("HH:mm");

    next();
});

const ServiceModel =
    mongoose.models.service5 || mongoose.model("service5", ServiceSchema);

export default ServiceModel;
