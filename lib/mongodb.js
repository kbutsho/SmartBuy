import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_LOCAL;

if (!MONGODB_URI) {
    throw new Error('please define the DATABASE_LOCAL environment variable in .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;