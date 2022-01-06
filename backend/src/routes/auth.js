const express = require('express');
const passport = require('passport');

const router = express.Router();


router.get('/github', passport.authenticate('github', { scope: [ 'repo','user:email', 'admin:org'], session: false }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        req.session.save(() => {
        res.redirect('/home');
        })
    }
);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

module.exports = router;
