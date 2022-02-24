const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
const githubServiceCommit = require('../services/getcommit.js');
const githubServiceIssue = require('../services/getissue.js');
const githubServicePull = require('../services/getpulls.js');
const githubServiceUser = require('../services/getuser.js');
const githubServiceMail = require('../services/mail.js');


router.get('/',(req,res)=>{
    res.send("Server start");
})

router.get('/home', async (req,res) => {
    const userJson = req.session.passport.user.profile._json;
    const userdb = req.session.passport.user.user
    const leftSide = githubServiceUser.UserInfo(userJson)
    const UpdateRepos = await githubServiceUser.orgRepoName(userdb.accessToken,userdb.githubId);

    if(userdb.email !== userJson.email){
        let githubId = userdb.githubId
        await User.updateOne({githubId},{email:userJson.email}).exec();
    }

    console.log(UpdateRepos);
    res.json(leftSide);
});

router.get('/commit', async(req,res) => {
    const Token = req.session.passport.user.user.accessToken;
    const userId = req.session.passport.user.user.githubId;
    const myCommit = await githubServiceCommit.getUserCommit(userId,Token)
    const Commits = githubServiceUser.getRefineData(myCommit)

    res.json(JSON.stringify(Commits))
})

router.get('/issue',async(req,res) => {
    const Token = req.session.passport.user.user.accessToken;
    const userId = req.session.passport.user.user.githubId;
    const myIssue = await githubServiceIssue.getUserIssue(userId,Token) 
    const Issues = githubServiceUser.getRefineData(myIssue)

    res.json(JSON.stringify(Issues))
})

router.get('/pullrequest', async(req,res) => {
    const Token = req.session.passport.user.user.accessToken;
    const userId = req.session.passport.user.user.githubId;
    const mypulls = await githubServicePull.getUserPull(userId,Token)
    const Pulls = githubServiceUser.getRefineData(mypulls)

    res.json(JSON.stringify(Pulls))
})

router.get('/alldata', async(req,res) => {
    const Token = req.session.passport.user.user.accessToken;
    const userId = req.session.passport.user.user.githubId;
    const myCommit = await githubServiceCommit.getUserCommit(userId,Token)
    const myIssue = await githubServiceIssue.getUserIssue(userId,Token)
    const mypulls = await githubServicePull.getUserPull(userId,Token)
    const result = githubServiceUser.AllData(myCommit, myIssue, mypulls)
<<<<<<< HEAD
    console.log(result);
    res.json(result)
=======
    res.json(JSON.stringify(result))
    // res.json(result)
>>>>>>> 81fb4c6c1724d355046c2efaf7ba8e654dbef4f1
})

router.get('/email',async (req,res) => {
    const userId = req.session.passport.user.user.githubId
    await githubServiceMail.checkEventData(userId);

    res.send('success email');

})

module.exports = router;