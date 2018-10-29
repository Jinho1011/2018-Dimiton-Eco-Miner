var express = require('express');
var router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

// 첫페이지가 사실 로그인 및 회원가입 페이지임
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'ECO ::  MINIG',
    twists: [],
    user: req.user,
    loginError: req.flash('loginError'), 
  });
});

router.get('/join', function(req, res, next) {
  res.render('join', { 
    title: 'ECO :: MINIG',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

router.get('/home', function(req, res, next) {
  res.render('home', { 
    title: 'ECO :: MINIG',
    user: req.user
  });
});

module.exports = router;
