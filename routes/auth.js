var express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {
    isLoggedIn,
    isNotLoggedIn
} = require('./middlewares');
const {
    User
} = require('../models');

const router = express.Router();

// 첫페이지가 사실 로그인 및 회원가입 페이지임
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const {
        id,
        password
    } = req.body;
    try {
        const exUser = await User.fint({
            where: {
                email
            }
        });
        if (exUser) {
            req.flash('joinError', '이미 가입된 ID 입니다');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            id,
            password: hash
        });
        return res.redirect('/home');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            req.flash('login', info.message);
            return res.redirect('/home');
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/home');
        });
    })(req,res,next);
});

router.get('/logout', isLoggedIn, (req,res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;