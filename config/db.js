import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    console.log("🔍 [connectDB] MONGODB_URI:", uri);
    if (!uri || !uri.startsWith("mongodb")) {
      throw new Error(
        `Invalid MONGODB_URI; must begin with "mongodb://" or "mongodb+srv://". Got: ${uri}`
      );
    }

    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(uri, opts).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
