import dotenv from "dotenv";
dotenv.config();


if(!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}
if(!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}
if(!process.env.JWT_EXPIRES_IN) {
    throw new Error("JWT_EXPIRES_IN is not defined in the environment variables");
}
if(!process.env.IMAGEKIT_API_KEY){
    throw new Error("IMAGEKIT_API_KEY is not defined in the environment variables");
}

export const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/snitch",
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/api/auth/google/callback",
    IMAGEKIT_API_KEY: process.env.IMAGEKIT_API_KEY 
}