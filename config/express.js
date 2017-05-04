var config = require('./config'),
    express = require('express'),
    morgon = require('morgan'),
    compress = require('compress'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport');
    
module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgon('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }))

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // Configure the flash messages middleware
	app.use(flash());
    
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);

    // Set Static Folder
    app.use(express.static('./public'));

    return app;
}