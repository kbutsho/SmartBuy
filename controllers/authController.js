import { NextResponse } from "next/server";
import User from "@/models/User";
import { handleError } from "@/utils/errorHandler";
import connectDB from "@/lib/mongodb";
import jwt from 'jsonwebtoken';


export const registration = async (req) => {
    await connectDB();

    try {
        const data = await req.json();
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: 'registration failed',
                error: {
                    "email": "Email already exists"
                }
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





export const login = async (req) => {
    await connectDB();

    try {
        const data = await req.json();
        if (!data.email || !data.password) {
            return NextResponse.json({
                success: false,
                message: 'Validation failed',
                error: {
                    ...(data.email ? {} : { email: 'Email is required' }),
                    ...(data.password ? {} : { password: 'Password is required' }),
                }
            }, { status: 400 });
        }

        const user = await User.findOne({ email: data.email, password: data.password });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'Login failed',
                error: {
                    email: 'Invalid email or password'
                }
            }, { status: 400 });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '12h' }
        );

        return NextResponse.json({
            success: true,
            message: 'User logged in successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        }, { status: 200 });

    } catch (error) {
        return handleError(error);
    }
};
