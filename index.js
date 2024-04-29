import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bookRoutes from "./routes/books.js";
import authorRoutes from "./routes/authors.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

// Server configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
