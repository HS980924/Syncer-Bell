const express = require('express');
const router = express.Router();
const githubService = require('../services/getuser.js');
const githubServiceIssue = require('../services/getissue.js');

router.get('/', async (req,res) => {
    const Token = req.session.passport.user.token;
    const leftSide = githubService.UserInfo(req.session.passport.user.profile._json)
    //const myRepo = await githubService.getUserCommit(leftSide.login,Token) 
    const myIssue = await githubServiceIssue.getUserIssue(leftSide.login,Token)
    //const orgCommit = await githubService.getOrgCommit(leftSide.repo,leftSide.login)



    console.log(myIssue)
    //console.log(myRepo);
    res.json(leftSide);
});

module.exports = router;