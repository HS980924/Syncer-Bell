const express = require('express');
const router = express.Router();
const githubService = require('../services/getuser.js');
const githubServiceIssue = require('../services/getissue.js');

router.get('/', async (req,res) => {
    const leftSide = githubService.UserInfo(req.session.passport.user.profile._json)
    
    res.json(leftSide);
});

router.get('/commit', async(req,res) => {
    const Token = req.session.passport.user.token;
    const userId = req.session.passport.user.profile.username
    const myCommit = await githubService.getUserCommit(userId,Token)

    res.json(myCommit)
})

router.get('/issue',async(req,res) => {
    const Token = req.session.passport.user.token;
    const userId = req.session.passport.user.profile.username;
    const myIssue = await githubServiceIssue.getUserIssue(userId,Token) 

    res.json(myIssue)
})

module.exports = router;