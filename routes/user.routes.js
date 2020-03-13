const express = require('express');
const router = express.Router();
const guard = require('../middlewares/guard');
const User = require('../model/User');
const Books = require('../model/Books');




// Get list of all books
router.get('/list', guard ,async (req, res) => {

  // Because of guard we dont need to check for auth
  const pagination = req.query.pagination ? parseInt(req.query.pagination) :10;

  const page = req.query.page ? parseInt(req.query.pagination) : 1;
  
    try {
      const foundBooks = await Books.find()
      .skip((page - 1) * pagination)
      .limit(pagination);
      res.send(foundBooks);
      
    } catch (err) {
      res.send('ERROR GETTING Books');
      throw err;
    }
  
});


// Get books by Id
router.get('/list/id/', guard, async (req, res) => {

  const { id , title } = req.headers;

  try {
    if (id) {
      const foundBook = await Books.findById(id);
      res.send(foundBook);
    } 
    else if (!id && title) {
      const foundBook = await Books.findById(title);
      res.send(foundBook);
    }
    else {
      res.send('Book not found');
    }
  }
  catch(err) {
    res.send({
      msg: 'Problem Finding',
    });
    throw new err;
  }

});


// User, Store new Book
router.post('/store', guard, async (req, res) => {

  const { title, description, author, quantity } = req.headers;

  try {
    const newBook = await new Books({title, description, author, quantity}).save();

    res.send({
      msg: 'New book stored',
      data: newBook
    });

  }
  catch(err) {
    res.send({
      msg: 'Problem Storing',
    });
    throw err;
    
  }
});


// Buy Book
router.put('/buy', guard, async (req, res) => {

  const { num, id } = req.headers;
  // let initQuantity = await Books.findById(title);
  // console.log(initQuantity);
  book = await Books.findById(id);
  // console.log(book);

  for (let i=0; i < num && book.quantity > 0 ; i=i+1) {
    book.quantity = book.quantity -1;
  }

  

  try {
    if (book) {
      await Books.updateOne({_id: book._id}, {$set: {quantity : book.quantity}});
      if (book.quantity === 0) res.send(`The book "${book.title}" sold out`);
      res.json({
        msg: 'Purchase Successful',
        numberOfBoughtBook: num,
        data: book
      })
      
      
    } 
    else {
      res.send('Book not found');
    }
  }
  catch(err) {
    res.send({
      msg: 'Problem Buying',
    });
    throw new err;
  }


});





module.exports = router;
