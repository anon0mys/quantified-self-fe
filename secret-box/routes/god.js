var express = require('express');
var router = express.Router();

/* GET programming god route */
router.get('/', function(req, res, next) {
  res.render('sweet_view', { title: 'Programming God' });
});

module.exports = router;
