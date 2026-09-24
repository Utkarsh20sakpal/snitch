import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req, res) => {
	response.json({ message: "API is running" });
});


app.use("/api/auth", authRoutes);
export default app;
