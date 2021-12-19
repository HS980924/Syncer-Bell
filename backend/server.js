const express = require('express');
const passport = require('passport');
const session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();

const GITHUB_CLIENT_ID = process.env.GITHUB_ID 
const GITHUB_CLIENT_SECRET = process.env.GITHUB_SECRET
const SECESSION_SECRET = process.env.SECESSION_SECRET
const app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: SECESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req, res) =>{
    res.sendFile(__dirname + "/views/login.html");
});

app.get('/home', (req,res) => {
    //res.sendFile(__dirname + "/views/home.html");
    res.json(req.user);
    console.log(req.user);
});


app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'repo','user:email' ], session: false }),
  function(req, res){

  });

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
      req.session.save(() => {
        const user = req.user;
        res.redirect('/home');
      })
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000,()=>{
  console.log("Server started at http://localhost:3000");
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}