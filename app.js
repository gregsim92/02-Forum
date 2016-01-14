var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var routes = require('./routes/index');
var subforum = require('./routes/subforum');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
require('dotenv').load();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY_1,
         process.env.SESSION_KEY_2]
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: process.env.API_KEY
  },
  function(identifier, profile, done) {
    knex('users').where({steam_identifier: identifier}).then(function(users){
      if (users.length > 0) {
        done(err, users[0]);
      } else {
        //insert
        knex('users').insert({
          username: req.body.personaname,
          steam_id: req.body.steamid,
          pic: req.body.avatar, ''
        })
        //then return
      }
    })
    //check to see whether the user exists by looking in the database using the identifier variable
    //if the user exists, set the user variable from the db
    //if not, create a user in the db, then set the user variable after you've created it in the db
      return done(err, user);
    
  }
));

// app.use(currentUser);

// function currentUser(req, res, next) {
//   req.session.notCrazy = "woo"
  
//   if (typeof req.session.user == 'string'){
//     req.session.user = JSON.parse(req.session.user);
//   }
//   res.locals.currentUser = req.session.user;
//   console.log('middleware');
//   console.log(req.session.user);


//   next();
// }

app.get('/auth/steam',
  passport.authenticate('steam'),
  function(req, res) {
    // The request will be redirected to Steam for authentication, so
    // this function will not be called.
  });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.use('/', routes);
app.use('/forums', subforum);
app.use('/users', users);



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
