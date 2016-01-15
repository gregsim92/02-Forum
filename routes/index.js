var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('subforums').then(function(rows){
  	res.render('./pages/index', {subforums: rows, session: req.session.passport});
  })
});

router.get('/login', function(req,res,next){
	res.redirect('/auth/steam');
});


module.exports = router;