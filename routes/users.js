var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:userid', function(req,res,next){
	res.redirect('/:userid/profile')
});

router.get('/:userid/profile', function(req,res,next){
	res.render('./pages/user');
});

router.get('/:userid/profile/edit', function(req,res,next){
	res.render('./pages/user');
});

router.get('/:userid/profile/delete', function(req,res,next){
	res.redirect('/');
});

module.exports = router;
