import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";
import "@/models/Brand";

export const createProduct = async (req) => {
    await connectDB();
    try {
        const data = await req.json();
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

export const getAllProducts = async () => {
    await connectDB();
    try {
        const products = await Product.find().populate('brand', 'name')
        return NextResponse.json({
            success: true,
            message: 'Products fetched successfully',
            products,
        }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
