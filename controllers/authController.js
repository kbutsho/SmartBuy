import { NextResponse } from "next/server";
import User from "@/models/User";
import { handleError } from "@/utils/errorHandler";
import connectDB from "@/lib/mongodb";

export const registration = async (req) => {
    await connectDB();

    try {
        const data = await req.json();
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: 'Email already exists',
            }, { status: 400 });
        }
        const newUser = new User(data);
        await newUser.save();
        return NextResponse.json({
            success: true,
            message: 'User registered successfully',
            user: newUser,
        }, { status: 201 });

    } catch (error) {
        return handleError(error);
    }
};
