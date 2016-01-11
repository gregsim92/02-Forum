var express = require('express');
var router = express.Router();

app.require

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./pages/index', { title: 'Homepage' });
});


module.exports = router;