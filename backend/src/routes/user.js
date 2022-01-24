const express = require('express');
const router = express.Router();
const githubServiceCommit = require('../services/getcommit.js');
const githubServiceIssue = require('../services/getissue.js');
const githubServicePull = require('../services/getpulls.js');
const githubServiceUser = require('../services/getuser.js');

router.get('/home', async (req,res) => {
    const leftSide = githubServiceUser.UserInfo(req.session.passport.user.profile._json)
    
    res.json(leftSide);
});

router.get('/commit', async(req,res) => {
    const Token = req.session.passport.user.token;
    const userId = req.session.passport.user.profile.username;
    const myCommit = await githubServiceCommit.getUserCommit(userId,Token)
    const result = githubServiceUser.getRefineData(myCommit)

    res.json(JSON.stringify(result))
})

router.get('/issue',async(req,res) => {
    const Token = req.session.passport.user.token;
    const userId = req.session.passport.user.profile.username;
    const myIssue = await githubServiceIssue.getUserIssue(userId,Token) 
    const result = githubServiceUser.getRefineData(myIssue)

    res.json(JSON.stringify(result))
})

router.get('/pullrequest', async(req,res) => {
    const Token = req.session.passport.user.token;
    const userId = req.session.passport.user.profile.username;
    const mypulls = await githubServicePull.getUserPull(userId,Token)
    const result = githubServiceUser.getRefineData(mypulls)

    res.json(JSON.stringify(result))
})

router.get('/alldata', async(req,res) => {
    const Token = req.session.passport.user.token;
    const userId = req.session.passport.user.profile.username;
    const myCommit = await githubServiceCommit.getUserCommit(userId,Token)
    const myIssue = await githubServiceIssue.getUserIssue(userId,Token)
    const mypulls = await githubServicePull.getUserPull(userId,Token)
    const result = githubServiceUser.AllData(myCommit, myIssue, mypulls)

    res.json(JSON.stringify(result))
})

module.exports = router;