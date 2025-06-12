import { NextResponse } from "next/server";

export function handleError(error) {
    // Validation errors
    if (error.name === 'ValidationError') {
        const errors = {};
        for (const key in error.errors) {
            errors[key] = error.errors[key].message;
        }
        return NextResponse.json({
            success: false,
            message: 'Validation failed',
            errors,
        }, { status: 400 });
    }

    // Duplicate key error
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return NextResponse.json({
            success: false,
            message: `${field} "${error.keyValue[field]}" already exists`,
        }, { status: 409 });
    }

    // CastError (invalid ObjectId, etc.)
    if (error.name === 'CastError') {
        // For ObjectId errors, customize the message
        if (error.kind === 'ObjectId') {
            const errors = {};
            errors[error.path] = `Invalid ObjectId value: "${error.value}"`;
            return NextResponse.json({
                success: false,
                message: 'Invalid ObjectId',
                errors,
            }, { status: 400 });
        }

        // Other CastError fallback
        return NextResponse.json({
            success: false,
            message: `Invalid ${error.path}: "${error.value}"`,
        }, { status: 400 });
    }

    // Fallback for all other errors
    return NextResponse.json({
        success: false,
        message: 'Internal server error',
        error: error.message,
    }, { status: 500 });
}
