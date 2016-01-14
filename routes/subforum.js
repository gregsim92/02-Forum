var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  res.send('respond with a forums');
});

router.get('/:subforum/new', function(req,res,next) {
	res.render('./pages/create');
});

router.post('/:subforum/new', function(req, res, next) {
	knex('threads').insert(
		{sub_id: req.params.subforum, 
		thread_name:req.body.title,
	 	thread_desc:req.body.post,
	 	thread_views:0
	 })
	.then(function(){
		res.redirect('/:subforum');
	})
});

router.get('/:subforum', function(req,res,next){
	knex('threads').then(function(threads){
  		res.render('./pages/sub', {threads: threads, sub_id: req.params.subforum});
	});
});


router.get('/:subforum/:thread', function(req,res,next){
	knex('posts').then(function(threads){
		res.render('./pages/thread.ejs', {threads: threads, name: req.params.thread});
	});
});

router.post('/:subforum/:thread', function(req,res,next) {
	//NEW POST in THREAD. make me
});

module.exports = router;
