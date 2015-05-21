
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



