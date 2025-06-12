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

const variantSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["UNOFFICIAL", "OFFICIAL", "USED"],
        default: "UNOFFICIAL",
        required: [true, "Product type is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
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
    colour: {
        type: String,
        required: [true, "Variant color is required"],
        trim: true
    },
    storage: {
        type: String,
        required: [true, "Variant storage is required"],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Stock cannot be negative"]
    },
    region: {
        type: String,
        required: [true, "Variant region is required"],
        trim: true
    },
    status: {
        type: String,
        enum: ["AVAILABLE", "STOCK OUT", "UPCOMING", "ARCHIVED"],
        default: "AVAILABLE",
        required: [true, "Product status is required"]
    }
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: [true, "Product Brand is required"]
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"]
    },
    ratingsCount: {
        type: Number,
        default: 0,
        min: [0, "Ratings count cannot be negative"]
    },
    thumbnail: {
        type: String,
        required: [true, "Product thumbnail URL is required"],
        trim: true
    },
    images: {
        type: [String],
        required: [true, "Product images URLs are required"],
        validate: {
            validator: function (v) {
                return v.length >= 3 && v.length <= 5;
            },
            message: props => {
                if (props.value.length === 0) {
                    return "Product images URLs are required";
                }
                if (props.value.length < 3) {
                    return `At least 3 images are required`;
                }
                if (props.value.length > 5) {
                    return `No more than 5 images allowed`;
                }
                return 'Invalid number of images';
            }
        }
    },
    variants: {
        type: [variantSchema],
        required: [true, "At least one product variant is required"],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: "At least one variant must be provided"
        }
    },
    others: [{
        key: {
            type: String,
            required: [true, "others Specification name is required"]
        },
        value: {
            type: String,
            required: [true, "others Specification value is required"]
        }
    }],
    reviews: [reviewSchema]
}, {
    timestamps: true
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;