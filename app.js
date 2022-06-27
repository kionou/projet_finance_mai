var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let depotRouter = require('./routes/depot.js')
const base = require('./others/database');
const session = require('express-session');



var app = express();

base.connect((err) =>{
  if (!err){
         console.log('connexion a la base de donnée'); 
      // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(session({ 
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 * 60 * 60 * 24 }}))

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/depot',depotRouter)

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

  }else{
        
    console.log('connection echec ' + JSON.stringify(err , undefined ,2),err); 
}
})


module.exports = app;
