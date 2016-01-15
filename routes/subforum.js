var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  res.send('respond with a forums');
});

router.get('/:subforum/new', function(req,res,next) {
	res.render('./pages/create', {sub_id: req.params.subforum});
});

router.post('/:subforum/new', function(req, res, next) {

	var s = req.params.subforum;

	knex('threads').insert(
		{sub_id: s, 
		thread_name:req.body.title,
	 	thread_desc:req.body.post,
	 	thread_views:0
	 })
	.then(function(){
		res.redirect('/forums/' + s);
	})
});

router.get('/:subforum', function(req,res,next){
	var s = req.params.subforum;
	var thisIs = req.session.passport.user.id;
	
	knex('threads').then(function(threads){
  		res.render('./pages/sub', {threads: threads, sub_id: s});
	});
});


router.get('/:subforum/:thread', function(req,res,next){
	var s = req.params.subforum;
	var t = req.params.thread;

	knex('posts').join('users', 'users.steam_id', '=', 'posts.user_id').then(function(posts){
		console.log(posts);
		res.render('./pages/thread', {posts: posts, name: t});
	});
});

router.post('/:subforum/:thread/new', function(req,res,next) {
	var s = req.params.subforum;
	var t = req.params.thread;



		knex('posts').insert(
			{user_id:  req.session.passport.user.id,
		 	thread_id:t,
		 	post_time: new Date(),
		 	post_html:req.body.reply
		 })
		.then(function(){
			res.redirect('/forums/'+s+'/'+t);
		})

});

module.exports = router;
