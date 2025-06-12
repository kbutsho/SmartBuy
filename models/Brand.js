import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Brand name is required"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Brand description is required"],
        trim: true,
        maxlength: [1000, "Description cannot exceed 500 characters"]
    },
    logo: {
        type: String,
        required: [true, "Brand logo URL is required"],
        trim: true
    },
}, {
    timestamps: true
});

const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);
export default Brand;