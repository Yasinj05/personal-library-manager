import express from "express";
import { Author, validate } from "../models/Author.mjs";

const router = express.Router();

// GET /authors - Retrieve a list of all authors
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// POST /authors - Add a new author
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const author = new Author({
    name: req.body.name,
    bio: req.body.bio,
  });

  try {
    await author.save();
    res.status(201).send(author);
  } catch (err) {
    res.status(500).send("Error saving the author");
  }
});

// GET /authors/:id - Retrieve an author by ID
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).send("Author not found");
    res.send(author);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// PUT /authors/:id - Update an author's details
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          bio: req.body.bio,
        },
      },
      { new: true }
    );

    if (!updatedAuthor) return res.status(404).send("Author not found");
    res.send(updatedAuthor);
  } catch (err) {
    res.status(500).send("Error updating the author");
  }
});

// DELETE /authors/:id - Delete an author
router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).send("Author not found");
    res.send(author);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;
