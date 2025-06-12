import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Brand name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Brand description is required"],
        trim: true
    }
}, {
    timestamps: true
});

const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);
export default Brand;