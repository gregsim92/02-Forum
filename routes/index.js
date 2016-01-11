var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./pages/index', { title: 'Homepage' });
});

router.get('/login', function(req,res,next){
	res.render('./pages/login', {title:'username'});
});


router.get('/signup', function(req,res,next){
	res.render('./pages/signup', {title:'sign up'});
});


router.get('/search', function(req,res,next){
	res.render('./pages/search', {title:'search'});
});

router.get('/logout', function(req,res,next){
	//clear cookies/session
	res.redirect('/')
})


module.exports = router;