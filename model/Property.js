import mongoose, { Schema } from "mongoose";

const toUpperCase = (str) => str.toUpperCase();

const ProjectSchema = new Schema(
    {
        adminid: {
            type: String,
            required: true,
        },
        sellertype: {
            type: String,
            enum: ['Onwer', 'Broker'],
            required: true,
        },
        name: {
            type: String,
            required: function () {
                return this.sellertype === 'Onwer';
            },
        },
        percentage: {
            type: Number,
            required: function () {
                return this.sellertype === 'Broker';
            },
        },
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        location: {
            type: String,
            required: true
        },
        price: { type: Number },
        metatitle: { type: String },
        metadescription: { type: String },
        propertyname: {
            type: String,
        },


        type: {
            type: String,
            enum: ['Apartment', 'House', 'Villa', 'Commercial', 'Land', 'Office'],
            required: true,
        },
        dateListed: { type: Date, default: Date.now },



        featureImage: [{ type: String }],
        images: [{ type: String }],

        address: {
            houseNumber: { type: String },
            colony: { type: String },
            area: { type: String },
            landmark: { type: String },
            city: { type: String },
            pincode: { type: String },
            state: { type: String, required: true, default: 'Rajasthan' },
            country: { type: String, required: true, default: 'India' },
        },

        floor: { type: Number, default: 0 },
        bedrooms: { type: Number, default: 0 },
        bathrooms: { type: Number, default: 0 },
        // landSize: { type: Number, default: 0 },
        size: { type: Number, default: 0 },
        length: { type: String, required: true, default: 0 },
        bredth: { type: String, required: true, default: 0 },
        facing: { type: String, required: true, default: "null" },
        boundarywall: { type: Boolean, required: true, default: false },
        verified: { type: Boolean, required: true, default: false },
        yearBuilt: { type: Number },

        purpose: {
            type: String,
            enum: ['Buy', 'Rent'],
        },
        listingType: {
            type: String,
            enum: ['New Listing', 'Featured', 'Focus', 'Top Project', 'Reduced Price', 'Open House'],
        },
        amenities: [{ type: String }],
        features: [{ type: String }],
        nearbyFacilities: [{ type: String }],
        securityFeatures: [{ type: String }],
        energyRating: { type: String },
        description: { type: String },
        propertyType: { type: String },
        // yearRenovated: { type: Number },
        heatingType: { type: String },
        coolingType: { type: String },
        parkingSpaces: { type: Number, default: 0 },
        flooringType: { type: String },
        viewType: { type: String },
        status: {
            type: String,
            enum: ['Available', 'Sold', 'Pending', 'Under Offer'],
            default: 'Available',
        },
        hasGarage: { type: Boolean, default: false },
        hasPool: { type: Boolean, default: false },
        hasGarden: { type: Boolean, default: false },
        petFriendly: { type: Boolean, default: false },
        defaultdata: { type: String, required: true, default: "project" }
    },
    { timestamps: true }
);

ProjectSchema.pre('save', async function (next) {
    // Capitalize location
    if (this.location) {
        this.location = toUpperCase(this.location);
    }

    // Capitalize address.city
    if (this.address && this.address.city) {
        this.address.city = toUpperCase(this.address.city);
    }

    // Generate slug
    if (!this.slug) {
        let slugBase = `${this.title.replace(/\s+/g, '-')}`;

        // Include propertyname in the slug if it exists
        if (this.propertyname) {
            slugBase += `-${this.propertyname.replace(/\s+/g, '-')}`;
        }

        this.slug = slugBase.toLowerCase();

        // Check for existing slugs and append a suffix if necessary
        try {
            let existingSlugCount = await this.constructor.countDocuments({ slug: this.slug }).exec();

            let slugAttempt = 1;
            while (existingSlugCount > 0) {
                this.slug = `${slugBase}-${slugAttempt}`.toLowerCase();
                existingSlugCount = await this.constructor.countDocuments({ slug: this.slug }).exec();
                slugAttempt++;
            }
        } catch (error) {
            return next(error);
        }
    }

    next();
});

const ProjectModel =
    mongoose.models.Project26 || mongoose.model("Project26", ProjectSchema);

export default ProjectModel;
