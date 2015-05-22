//var User = require('./models/user');

module.exports  =   function(app,passport) {
    
    app.get('/signup', function(req, res) {
        res.render('signup');
    });


    app.post('/signup', function(req, res) {
        console.log('email: ' + req.body.email);
        
        res.send('finish signup');
        
    });



}

