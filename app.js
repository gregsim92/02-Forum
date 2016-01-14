var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');


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



app.use(currentUser);

function currentUser(req, res, next) {
  req.session.notCrazy = "woo"
  
  if (typeof req.session.user == 'string'){
    req.session.user = JSON.parse(req.session.user);
  }
  res.locals.currentUser = req.session.user;
  console.log('middleware');
  console.log(req.session.user);
  // var n = req.session.count++;
  // res.send('viewed ' + n + ' times\n');

  next();
}

app.use('/', routes);
app.use('/forums', subforum);
app.use('/users', users);

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
