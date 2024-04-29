import express from "express";
import { Author, validate } from "../models/Author.mjs";

const router = express.Router();

// GET /authors - Retrieve a list of all authors
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to retrieve authors", error: err.message });
  }
});

// POST /authors - Add a new author
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({
      message: "Validation failed",
      errors: error.details.map((detail) => detail.message),
    });

  const author = new Author({
    name: req.body.name,
    bio: req.body.bio,
  });

  try {
    await author.save();
    res.status(201).send(author);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error saving the author", error: err.message });
  }
});

// GET /authors/:id - Retrieve an author by ID
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).send({ message: "Author not found" });
    res.send(author);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error retrieving author", error: err.message });
  }
});

// PUT /authors/:id - Update an author's details
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({
      message: "Validation failed",
      errors: error.details.map((detail) => detail.message),
    });

  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedAuthor)
      return res.status(404).send({ message: "Author not found" });
    res.send(updatedAuthor);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error updating the author", error: err.message });
  }
});

// DELETE /authors/:id - Delete an author
router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).send({ message: "Author not found" });
    res.send({ message: "Author deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting the author", error: err.message });
  }
});

export default router;
