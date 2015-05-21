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

require('./config/passport')(passport);

app.listen(port, function() {
    
    console.log('listening on port: ' + port);
});
