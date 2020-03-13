const mongoose = require('../bootstrap/db');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;


const BookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  author: { type: String, required: true },
  quantity: { type: Number, required:true },
  users: { type: String },
});

// Validate User Inputs
BookSchema.method.joiValidate = (obj) => {
    let schema = {
		title: Joi.types.String().required(),
		description: Joi.types.String().min(6).max(30),
		author: Joi.types.String().required(),
		quantity: Joi.types.Number().min(0).required(),
		users: Joi.types.String(),
	}
	return Joi.validate(obj, schema);
};

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;