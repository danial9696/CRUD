const guard = require('../middlewares/guard');
/* Routes */

module.exports = (app) => {
  app.use('/', require('./homeRoutes'));
  // app.use('/auth', require('./auth.routes'));
  app.use('/api/v1/signup', require('./signUp'));
  app.use('/api/v1/login', require('./login'));
  app.use('/api/v1/logout', require('./logout'));
  app.use('/api/v1/user',  require('./user.routes'));
};
