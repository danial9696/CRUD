const mongoose = require('mongoose');

url = 'mongodb://localhost:27017/Library';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }, (err, res) => {
    if (err) throw err;

});

module.exports = mongoose;