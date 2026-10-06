import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "./src/config/passport.js";
import productRoutes from "./src/routes/product.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(
	cors({
		origin: ["http://localhost:5173"],
		credentials: true,
	})
);

app.get("/", (_req, res) => {
	res.json({ message: "API is running" });
});


app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);
export default app;
