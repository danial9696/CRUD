const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Library');
});

module.exports = router;