const mongoose = require('../bootstrap/db');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: { type: String, required: true },
  family: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: false, min: 18, max: 60 },
  password: { type: String, minlength: 6 },
  books: { type: Number },
  type: { type: String, required: false },
  tokens: { type: String },
  image: { type: Object }
});

// Validate User Inputs
UserSchema.method.joiValidate = (obj) => {
    let schema = {
		name: Joi.types.String().min(6).max(30).required(),
		family: Joi.types.String().min(6).max(30).required(),
		email: Joi.types.String().email().required(),
		password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
    age: Joi.types.integer().min(18).max(60),
    image: Joi.type.Object()
	}
	return Joi.validate(obj, schema);
};

// Hash Password
UserSchema.pre('save', function(next) {
  // Cause We need obejt from userSchema below
  const user = this;

  // Update your Mongoose middleware to only hash the password if it has been modified (or is new)
  // It is important because it if we dont check it if we put wrong password it hashes and saves the wrongs password and
  // later even if we put correct password it dosent compare because the wrong password was hashed and saved before.
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    // Cause We dont have res
    if(err) next(err);

    bcrypt.hash(user.password, salt, async function(err, hashed) {
       user.password =  hashed;
       next();
    });
  });
  
});

// JWT Generator
UserSchema.methods.generateAuthToken = async function() {
  const user = this;

  const token = jwt.sign({_id: user._id}, process.env.JWT_KEY , { expiresIn: '3600h' });
  // console.log(token);
  user.tokens = token;
  await user.save();
  return token;

}

// Find User Email And Password
UserSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne( { email } );
  console.log(user);

  if (!user) {
    throw new Error({ error: 'Invalid login credentials' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  console.log(isPasswordMatch);

  if (!isPasswordMatch) {
    // res.json('Invalid login credentials');
    // console.log('Invalid login credentials p');
    throw new Error({ error: 'Invalid login credentials' });
  }
  return user;
};



// Upload file or imgae with Multer
UserSchema.methods.upload = async (req, res) => {

  

};
  

const User = mongoose.model('User', UserSchema);

module.exports = User;
