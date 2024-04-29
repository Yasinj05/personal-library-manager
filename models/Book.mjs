import mongoose from "mongoose";
import Joi from "joi";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: [
      "Fiction",
      "Non-Fiction",
      "Science Fiction",
      "Fantasy",
      "Mystery",
      "Other",
    ],
  },
  publicationYear: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear(),
  },
});

// Validate Book data using Joi
const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    author: Joi.string().required(),
    genre: Joi.string()
      .valid(
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Other"
      )
      .required(),
    publicationYear: Joi.number()
      .integer()
      .min(1800)
      .max(new Date().getFullYear()),
  });

  return schema.validate(book);
};

const Book = mongoose.model("Book", bookSchema);

export { Book, validateBook as validate, bookSchema };
