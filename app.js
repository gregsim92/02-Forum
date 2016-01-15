var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var knex = require('./db/knex');
var temp, identifier

var routes = require('./routes/index');
var subforum = require('./routes/subforum');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if(process.env.NODE_ENV == 'development'){

    require('dotenv').load();
  }
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

app.use(function (req,res,next) {
  if(req.session.passport) {
    res.locals.user = req.session.passport.user
    console.log(req.session.passport.user)
  } else {
    res.locals.user = null
  }
    next();
})

passport.use(new SteamStrategy({
    returnURL: process.env.HOST + '/auth/steam/return',
    realm: process.env.HOST,
    apiKey: process.env.API_KEY
  },
  function(identifier, profile, done) {

    var temp = identifier.split("/")
    var identifier = parseInt(temp[temp.length-1])
    var steadId = profile._json.steamid

    console.log(identifier)
    console.log('============')
    console.log(profile._json.personaname)
    console.log('============')

    knex('users').where({steam_id: identifier}).then(function(users){
      if (users.length > 0) {
        done(null, users[0]);
      } else {
        //insert
        console.log('xxxxxxxxxxxxxxx')
        console.log(profile)
        knex('users').insert({
          username: profile._json.personaname,
          steam_id: steadId,
          pic: profile._json.avatarfull
        }).then(function(){
          return done(null, profile);
        })
        //then return
      }
    })
    //check to see whether the user exists by looking in the database using the identifier variable
    //if the user exists, set the user variable from the db
    //if not, create a user in the db, then set the user variable after you've created it in the db
    
  }
));

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

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.use('/', routes);
app.use('/forums', subforum);
app.use('/users', users);



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
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
