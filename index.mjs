import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bookRoutes from "./routes/books.mjs";
import authorRoutes from "./routes/authors.mjs";

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
