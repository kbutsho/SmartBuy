import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export const createProduct = async (req) => {
    await connectDB();
    try {
        const data = await req.json();
        const isExist = await Product.findOne({ title: data.title });
        if (isExist) {
            return NextResponse.json({
                success: false,
                message: 'Product not created',
                error: {
                    "name": "Product with this title already exists"
                }
            }, { status: 400 });
        }
        const newProduct = new Product(data);
        await newProduct.save();
        return NextResponse.json({
            success: true,
            message: 'Product created successfully',
            product: newProduct,
        }, { status: 201 });
    } catch (error) {
        return handleError(error);
    }
}