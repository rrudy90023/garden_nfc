const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const flash = require('connect-flash');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo(expressSession);
const config = require('./config');
const conn = require('./conn');
const routes = require('./routes/index');
const users = require('./routes/users');
const plants = require('./routes/plants');
const admin = require('./routes/admin');
const emails = require('./routes/emails');
const dashboard = require('./routes/dashboard');
const passportConfig = require('./auth/passport-config');
const restrict = require('./auth/restrict');
passportConfig();

//console.log(conn.connector)
//mongoose.connect(config.mongoUri, { useNewUrlParser: true });

const app = express();

app.set('production', process.env.NODE_ENV == 'production');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.appdata = require('./data.json');

app.use(expressSession(
    {
        secret: 'LA',
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
           mongooseConnection: mongoose.connection 
        })
    }
));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use('/', routes);
app.use('/admin', admin);
app.use('/users', users);
app.use('/emails', emails);
app.use('/dashboard', dashboard);
//app.use(restrict);
app.use('/plants', plants);

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
