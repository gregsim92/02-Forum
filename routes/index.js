var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("root: ", req.session);
  knex('subforums').then(function(rows){
  	console.log(res.locals);
  	res.render('./pages/index', {subforums: rows});
  })
});



router.get('/signup', function(req,res,next){
	// console.log(req.session);
	if (req.session.err) {
		var errorMessage = req.session.err
	} else {
		var errorMessage = ""
	};
	// req.session.err = null;
	res.render('./pages/signup', {title:'Sign Up', err: errorMessage});
});

router.post('/signup', function(req,res,next){
	// console.log();
	
	// //#TODO: need to check if requested username is available
	// //#TODO: confirm password, make sure pass field matches pass confirm field
	knex('users').where('username', req.body.username)
		.first().then(function (user) {
			console.log(user);
			if(!user){
			  var hash = bcrypt.hashSync(req.body.password, 8)
				knex('users').insert(
					{username: req.body.username, 
					password: hash,
				 	email:req.body.email,
				 	is_mod: false}, 'id')
				.then(function(id){
					console.log("id: %s", id)
					console.log("======================")

					req.session.user = JSON.stringify({
										username: req.body.username, 
										password:req.body.password,
									 	email:req.body.email,
									 	is_mod: false});
					req.session.err = "";
					console.log(req.session);
					console.log('=====')
					console.log(req.session.user);
					console.log('=====')

			   });
				console.log(req.session)
				knex('subforums').then(function(rows){
				  	console.log(res.locals);
				  	res.redirect('/');
				  })
			} else if (user){
				console.log(user);
				res.status(409);
				req.session.err = "Username not available"
				res.redirect('/signup');
			}// if statement
		})
	
});



router.get('/login', function(req,res,next){
	res.render('./pages/login', {title:'Log In'});
});

// router.post('/login', function(req,res,next){
// 	knex('users').where({username: req.body.username})
// 		.first().then(function(currentUser){
// 			if(currentUser){
// 				if({req.body.password, currentUser.password})
// 			}
// 		})
	//#TODO: check whether the user is valid, throw error for invalid user, redirect home for valid
// })



// router.get('/search', function(req,res,next){
// 	res.render('./pages/search', {title:'search'});
// });

// router.get('/logout', function(req,res,next){
// 	//clear cookies/session
// 	req.session = null;
// 	res.redirect('/')
// });

module.exports = router;