const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './')
      },


    filename: function (req, file, callback) {
      //..
    }
  });

  module.exports = storage;