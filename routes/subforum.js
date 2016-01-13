var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  res.send('respond with a forums');
});

router.get('/:subforum/new', function(req,res,next) {
	console.log("recieved");
});

router.get('/:subforum', function(req,res,next){
	knex('threads').then(function(threads){
  		res.render('./pages/sub', {threads: threads, name: req.params.subforum});
	});
});

router.get('/:subforum/:thread', function(req,res,next){
	res.render('./pages/thread');
});

module.exports = router;
