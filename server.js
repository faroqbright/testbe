import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/messageRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// ✅ Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json()); // ⬅️ This parses incoming JSON
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
