var express =   require('express');

var app =   express();
var port    =   3000;


app.set('view engine','ejs');

var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser	= require('body-parser');
var flash = require('connect-flash');

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
      
      if (username !== password) {
        return done(null, false, { message: 'Incorrect username Or Password.' });
      }
      
      var user = {id: username};

      return done(null, user);
  }
));


passport.serializeUser(function(user, done) {

  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  done(null, {id: id, name: id});
});

// check if user logged
function  checkAuthenticated(req,res,next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/', function(req,res) {
    
    res.render('index',
    		{	isLogged: req.isAuthenticated(),
    			user: req.user
    		}
    	);
});


app.get('/login', function(req, res) {
    res.render('login');
});


app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/');
    
});

// API request with authenticating required
app.get('/api', checkAuthenticated, function(req,res){
    res.json({firstname: 'Minh', 
        lastname: 'Mai',
        email: 'minhmt@mail.com'
    });
    
});

app.listen(port, function() {
    
    console.log('listening on port: ' + port);
});

