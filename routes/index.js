var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('subforums').then(function(rows){
  	res.render('./pages/index', {subforums: rows});
  })
});

router.get('/login', function(req,res,next){
	res.render('./pages/login', {title:'Log In'});
});

router.post('/login', function(req,res,next){
	//#TODO: check whether the user is valid, throw error for invalid user, redirect home for valid
})


router.get('/signup', function(req,res,next){
	res.render('./pages/signup', {title:'Sign Up'});
});

router.post('/signup', function(req,res,next){
	console.log();
	
	//#TODO: need to check if requested username is available
	//#TODO: confirm password, make sure pass field matches pass confirm field

	knex('users').insert(
		{username: req.body.username, 
		password:req.body.password,
	 	email:req.body.email,
	 	is_mod: false})
	.then(function(){
		req.session.user = JSON.stringify({username: req.body.username, 
							password:req.body.password,
						 	email:req.body.email,
						 	is_mod: false})
		res.redirect('/');
	})
});

router.get('/search', function(req,res,next){
	res.render('./pages/search', {title:'search'});
});

router.get('/logout', function(req,res,next){
	//clear cookies/session
	res.redirect('/')
});

module.exports = router;