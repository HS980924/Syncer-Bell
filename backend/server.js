const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
require('dotenv').config();

const userRouter = require('./src/routes/user');
const authRouter = require('./src/routes/auth');

const {findUserId, checkEventData} = require('./src/services/mail');
const { updateUserRepos } = require('./src/services/getuser');

const SECESSION_SECRET = process.env.SECESSION_SECRET
const MONGODB_URL = process.env.MongoDBURL

mongoose.connect(MONGODB_URL)
.then(res => console.log("Connected to database successfully"))
.catch(err => console.error(err));

const autoScheduler = schedule.scheduleJob('* * * * *', async() => {
    const userIds = await findUserId();
    userIds.forEach(userId => {
        updateUserRepos(userId),
        checkEventData(userId)});
})

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: SECESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
require('./src/configs/passport.js')();

app.use('/auth', authRouter);
app.use('/', userRouter);

app.listen(5000,(err)=>{
    if(err){
        return console.log(err);
    }
    else{
        console.log("Server started at http://localhost:5000");
    }
});

module.exports = app;