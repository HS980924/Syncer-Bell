const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const userRouter = require('./src/routes/user');
const authRouter = require('./src/routes/auth');
const loginRouter = require('./src/routes/login');

const SECESSION_SECRET = process.env.SECESSION_SECRET
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: SECESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
require('./src/configs/passport.js')();

app.use('/auth', authRouter);
app.use('/', userRouter);
app.use('/', loginRouter);

app.listen(5000,()=>{
    console.log("Server started at http://localhost:5000");
});

module.exports = app;