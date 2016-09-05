const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/beers', require('./beers'))
module.exports = router;
