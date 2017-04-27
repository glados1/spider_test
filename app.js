var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var ejs = require('ejs');
var cors = require('cors');

/**
*	引用 express-session 和 connect-mongo 进行 session 控制
*/
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

/**
*	引用 config 模块，主要用于 session 的配置
*/
var config = require('./config');


/**
* 路由模块引用
*/
var webRouter = require('./routes/index');


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
*	添加静态资源目录
*/
app.use(express.static(path.join(__dirname, 'dist'),{maxAge:'1s'}));

/**
*	添加日志模块
*/
var logger = require('./logger');
app.use(logger.loggerMiddleware);


/**
* 使用鉴权模块
*/

app.use(session({
  secret : 'no time to waste',
  cookie : {
    maxAge : 30 * 60 * 1000
  },
  // 使用 mongodb 存储 session 数据 
  store : new MongoStore(config.sessionSettings)
}));

/**
* 路由模块
*/

app.use('/', webRouter);



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
    res.status(err.status || 500);
    res.render('modules/error', {
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
