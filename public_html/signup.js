var express =   require('express');
var app =   express();

var port    =   process.env.PORT || 3000;


app.set('view engine','ejs');

var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser	= require('body-parser');
var flash = require('connect-flash');

var passport = require('passport');

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());

app.use(expressSession({secret: 'mySecretKey',
                        saveUninitialized: true,
			resave: true})
        ); // you should use your own secret key here, exm: aYHXSoiwoXWEWE

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var dbConfig    =   require('./config/db');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

require('./config/passport')(passport);

//app routes
require('./routes/app')(app,passport);
require('./routes/signup')(app,passport);

app.listen(port, function() {
    
    console.log('listening on port: ' + port);
});

