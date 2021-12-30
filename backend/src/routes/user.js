const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    const userdata = req.user._json
    const leftSide = {
        "login" : userdata.login,
        "name" : userdata.name,
        "image" : userdata.avatar_url,
        "url": userdata.html_url,
        "context": userdata.bio,
        "email" : userdata.email,
        "company" : userdata.company,
        "location" : userdata.location,
        "blog" : userdata.blog,
        "followers" : userdata.followers,
        "following" : userdata.following,
        "repo" : userdata.repos_url,
        "org" : userdata. organizations_url
    }
    res.json(leftSide);
});




module.exports = router;