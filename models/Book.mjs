import mongoose from "mongoose";
import Joi from "joi";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  publishedDate: Date,
  genres: [String],
});

const Book = mongoose.model("Book", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    publishedDate: Joi.date().iso(),
    genres: Joi.array().items(Joi.string()).optional(),
  });

  return schema.validate(book);
}

export { Book, validateBook as validate, bookSchema };
