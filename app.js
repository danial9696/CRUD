
const express = require('express');
const app = express();


require('./middlewares')(app);

require('./routes')(app);

require('./services/errorhandlers')(app);


module.exports = app;
