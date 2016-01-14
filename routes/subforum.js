var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  res.send('respond with a forums');
});

router.get('/:subforum/new', function(req,res,next) {
	res.render('./pages/create');
});

router.get('/:subforum', function(req,res,next){
	knex('threads').then(function(threads){
  		res.render('./pages/sub', {threads: threads, sub_id: req.params.subforum});
	});
});

router.post('/:')

router.get('/:subforum/:thread', function(req,res,next){
	knex('posts').then(function(threads){
		res.render('./pages/thread.ejs', {threads: threads, name: req.params.thread});
	});
});

module.exports = router;
