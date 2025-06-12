import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Review user is required"]
    },
    rating: {
        type: Number,
        required: [true, "Review rating is required"],
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"]
    },
    comment: {
        type: String,
        required: [true, "Review comment is required"],
        trim: true
    }
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"]
    },
    discountPrice: {
        type: Number,
        min: [0, "Discount price cannot be negative"],
        validate: {
            validator: function (val) {
                return val <= this.price;
            },
            message: "Discount price cannot exceed original price"
        }
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product category is required"]
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"]
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Stock cannot be negative"]
    },
    tags: [{
        type: String,
        trim: true,
        required: [true, "Product tags are required"]
    }],
    thumbnail: {
        type: String,
        required: [true, "Product image URL is required"],
        trim: true
    },
    images: [{
        type: String,
        required: [true, "Product images URLs are required"],
        trim: true
    }],
    status: {
        type: String,
        enum: ["in-stock", "out-of-stock", "archived"],
        default: "active",
        required: [true, "Product status is required"]
    },
    reviews: [reviewSchema]
}, {
    timestamps: true
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;