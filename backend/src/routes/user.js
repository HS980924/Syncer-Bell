const express = require('express');
const router = express.Router();
const githubServiceCommit = require('../services/getuser.js');
const githubServiceIssue = require('../services/getissue.js');
const githubServicePull = require('../services/getpulls.js');

router.get('/home', async (req,res) => {
    const leftSide = githubServiceCommit.UserInfo(req.session.passport.user.profile._json)
    
    res.json(leftSide);
});

router.get('/commit', async(req,res) => {
    const Token = req.session.passport.user.token;
    const userId = req.session.passport.user.profile.username;
    const myCommit = await githubServiceCommit.getUserCommit(userId,Token)
    
    
    res.json(myCommit)
})

router.get('/issue',async(req,res) => {
    const Token = req.session.passport.user.token;
    const userId = req.session.passport.user.profile.username;
    const myIssue = await githubServiceIssue.getUserIssue(userId,Token) 


    res.json(myIssue)
})

router.get('/pullrequest',async(req,res) => {
    const Token = req.session.passport.user.token;
    const userId = req.session.passport.user.profile.username;
    const mypulls = await githubServicePull.getUserPull(userId,Token) 

    
    res.json(mypulls)
})

module.exports = router;