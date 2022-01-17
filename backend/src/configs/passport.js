const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

module.exports = () =>{
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_ID ,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: "http://localhost:5000/auth/github/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            //process.nextTick(function () {
                return done(null,{profile: profile, token: accessToken});
        //});
        }
    ));
}
