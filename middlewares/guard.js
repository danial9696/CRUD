const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  const { tokens } = req.headers;

  if (!tokens) {
    res.send('Logged out');
  } 
  else {
    jwt.verify(tokens, process.env.JWT_KEY, function(err, verified) {
      if (err) res.send('AUTHENTICATION ERROR');
      if (verified) {
        next();
      }
    });
  }
}