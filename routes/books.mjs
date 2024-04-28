import express from "express";
import { Book, validate } from "../models/Book.mjs";

const router = express.Router();

// GET /books - Retrieve a list of all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("author", "name");
    res.send(books);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// POST /books - Add a new book to the library
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      publishedDate: req.body.publishedDate,
      genres: req.body.genres,
    });
    await newBook.save();
    res.status(201).send(newBook);
  } catch (err) {
    res.status(500).send("Error saving the book");
  }
});

// GET /books/:id - Retrieve a book by its ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author", "name");
    if (!book) return res.status(404).send("Book not found");
    res.send(book);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// PUT /books/:id - Update the information of an existing book
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body, true);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          publishedDate: req.body.publishedDate,
          genres: req.body.genres,
        },
      },
      { new: true }
    );

    if (!updatedBook) return res.status(404).send("Book not found");
    res.send(updatedBook);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// DELETE /books/:id - Remove a book from the library
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book)
      return res.status(404).send("The book with the given ID was not found");
    res.send(book);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;
