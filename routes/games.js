var express = require('express');
var router = express.Router();

var app = express();

var hearthstone = require('./hearthstone');

app.use('/hearthstone', hearthstone);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./pages/index', { title: 'Express' });
});


module.exports = router;