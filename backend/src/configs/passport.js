const passport = require('passport');
const githubServiceUser = require('../services/getuser.js');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User.js');


const githubLogin = async (accessToken, refreshToken, profile, done) =>{
    try{
        const {login: githubId, email: email } = profile._json;
        // await User.deleteOne({githubId}).exec();
        let user = await User.findOne({githubId}).exec();

        if (!user){
            const repo = await githubServiceUser.orgRepoName(accessToken,profile._json.login);
            user = await User.create({
                email: email,
                githubId,
                accessToken,
                repos: repo,
                events: [],
                showcnt: 5,
                Color: null,
                checkCommit: true,
                checkIssue: true,
                checkPr: true
            });
        }
        else if (user.accessToken !== accessToken){
            user.accessToken = accessToken;
            await user.save()
        }

        return done(null,{profile: profile, user:user});
    }
    catch(err){
        return done(err);
    }
}

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
        githubLogin
    ));
}
