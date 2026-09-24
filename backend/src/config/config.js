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

export const config = {

    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/snitch",
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
}