const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: [ 'repo','user:email', 'admin:org'], session: false }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/', }),
    function(req, res) {
        req.session.save(() => {
            const user = req.user;
            res.redirect('http://localhost:3000/loading');
        })
    }
);

router.get('/logout', function(req, res){
    req.logOut();
    res.redirect('http://localhost:3000');
});

module.exports = router;
