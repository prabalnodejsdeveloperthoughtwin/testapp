var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
const chalk = require('chalk');
var NginxConfFile = require('nginx-conf').NginxConfFile;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var $           = require('jquery'); 
const websocket=require('./config/socket')
var app = express();
dotenv.config({ path: '.env' });
const pass=require('./passport')
console.log("GGGG"+process.env.MONGODB_URI)
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI,{ useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery',express.static(__dirname+'/node_modules/jquery/dist/')); 

app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use(cors())
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// NginxConfFile.create('/etc/nginx/nginx.conf', function(err, conf) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log(conf.nginx.user._value);
//   console.log(conf.nginx.http.server.listen._value);

// })
 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}


module.exports = app;
