import connectDB from "@/lib/mongodb";
import Brand from "@/models/Brand";
import { handleError } from "@/utils/errorHandler"
import { NextResponse } from "next/server";

export const createBrand = async (req) => {
    await connectDB();
    try {
        const data = await req.json();
        const isExist = await Brand.findOne({ name: data.name });
        if (isExist) {
            return NextResponse.json({
                success: false,
                message: 'Brand not created',
                error: {
                    "name": "Brand with this name already exists"
                }
            }, { status: 400 });
        }
        const newBrand = new Brand(data)
        await newBrand.save();
        return NextResponse.json({
            success: true,
            message: 'Brand created successfully',
            brand: newBrand,
        }, { status: 201 });
    } catch (error) {
        return handleError(error)
    }
}