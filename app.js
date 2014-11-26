var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');
require('./utils/hbs.utils');
var session = require('express-session');
var flash = require('connect-flash');
var settings = require('./settings');
var RedisStore = require('connect-redis')(session);

var routes = require('./routes/index');
var users = require('./routes/users');
var category = require('./routes/category');
var faq = require('./routes/faq');
var filter = require('./routes/filter');
var ueditor = require('./routes/ueditor');

var app = express();

// view engine setup
app.engine('hbs', hbs.express3({
    partialsDir: __dirname + '/views'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: settings.cookieSecret,
    key: settings.cookieName,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store :new RedisStore(settings.redis)
}));
app.use(flash());
app.enable('trust proxy');//信任代理

app.use(filter);
app.use('/', routes);
app.use('/users', users);
app.use('/category',category);
app.use('/faq',faq);
app.use(ueditor);

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
