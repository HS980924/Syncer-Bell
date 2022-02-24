const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: [ 'repo','user:email', 'admin:org'], session: false }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), //successRedirect: '/home',
    function(req, res) {
        req.session.save(() => {
            res.redirect('http://localhost:3000/loading');
        })
    }
);

router.get('/logout', function(req, res){
    req.logOut();
<<<<<<< HEAD
    res.redirect('http://localhost:3000');
=======
    // req.session.destroy(function(){
    //     req.session;
    //     //res.clearCookie('connect.sid',{path:'/home'});
    //     //res.redirect('/');
    // });
    res.redirect('http://localhost:3000/');
>>>>>>> 81fb4c6c1724d355046c2efaf7ba8e654dbef4f1
});

module.exports = router;
