var express =   require('express');

var app =   express();
var port    =   3000;


app.set('view engine','ejs');

var expressSession = require('express-session');
var cookieParser	=	require('cookie-parser');
var bodyParser		=	require('body-parser');
var flash 			=	require('connect-flash');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());

app.use(expressSession({secret: 'mySecretKey'})); // you should use your own secret key here, exm: aYHXSoiwoXWEWE
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(
  function(username, password, done) {

  	console.log(username);

      if (username != password) {
        return done(null, false, { message: 'Incorrect username Or Password.' });
      }

      var user = {username: username};

      return done(null, user);
  }
));


app.get('/', function(req,res) {
    
    res.render('index',
    		{	isLogged: false,
    			user: req.user
    		}
    	);
});


app.get('/login', function(req, res) {

	console.log('on Login..');

	res.render('login');
});


app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true },
                                   function(req, res) {
		    // If this function gets called, authentication was successful.
		    // `req.user` contains the authenticated user.
		    res.redirect('/dashboard');
		  })
);


app.listen(port, function() {
    
    console.log('listening on port: ' + port);
});

