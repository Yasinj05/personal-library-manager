import express from "express";
import { Book, validate } from "../models/Book.js";

const router = express.Router();

// GET /books - Retrieve a list of all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("author", "name -_id");
    res.send(books);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to retrieve books", error: err.message });
  }
});

// POST /books - Add a new book to the library
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({
      message: "Validation failed",
      errors: error.details.map((detail) => detail.message),
    });

  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publicationYear: req.body.publicationYear,
    });
    await newBook.save();
    res.status(201).send(newBook);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error saving the book", error: err.message });
  }
});

// GET /books/:id - Retrieve a book by its ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "author",
      "name -_id"
    );
    if (!book) return res.status(404).send({ message: "Book not found" });
    res.send(book);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to retrieve the book", error: err.message });
  }
});

// PUT /books/:id - Update the information of an existing book
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({
      message: "Validation failed",
      errors: error.details.map((detail) => detail.message),
    });

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedBook)
      return res.status(404).send({ message: "Book not found" });
    res.send(updatedBook);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error updating the book", error: err.message });
  }
});

// DELETE /books/:id - Remove a book from the library
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send({ message: "Book not found" });
    res.send({ message: "Book deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting the book", error: err.message });
  }
});

export default router;
