var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a forums');
});

router.get('/:subforum', function(req,res,next){
	res.render('./pages/sub');
});

router.get('/:subforum/:thread', function(req,res,next){
	res.render('./pages/thread');
});

module.exports = router;
