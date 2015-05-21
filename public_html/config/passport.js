var LocalStrategy = require('passport-local').Strategy;
module.exports = function(passport) {
    
    //
    passport.use(new LocalStrategy(
        function(username, password, done) {

            if (username !== password) {
              return done(null, false, { message: 'Incorrect username Or Password.' });
            }

            var user = {id: username};

            return done(null, user);
        }
    ));

    // passport for signup page
    passport.use('local-signup', new LocalStrategy({passReqToCallback: true},
        function(req, username,password, done) {

            console.log('Email: ' + req.param('email'));
            return done(null, null);
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
}


