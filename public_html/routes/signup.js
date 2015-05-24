var User = require('../models/user');

module.exports  =   function(app,passport) {
    
    app.get('/signup', function(req, res) {
        res.render('signup');
    });


    app.post('/signup', function(req, res) {
        
        var newUser =   new User();
        newUser.username    =   req.body.username;
        newUser.email   =   req.body.email;
        var newPass =   req.body.password;
        newUser.password    =   newPass;
        
        newUser.save(function(err){
			if(err)
				throw err;
		});
             
        res.redirect('/?finish-signup');
               
    });



}

