import mongoose from "mongoose";
import Joi from "joi";

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
});

const Author = mongoose.model("Author", authorSchema);

function validateAuthor(author) {
  const schema = Joi.object({
    name: Joi.string().required(),
    bio: Joi.string().allow("", null),
  });

  return schema.validate(author);
}

export { Author, validateAuthor as validate, authorSchema };
