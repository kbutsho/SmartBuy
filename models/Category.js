import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Category description is required"],
        trim: true
    }
}, {
    timestamps: true
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;