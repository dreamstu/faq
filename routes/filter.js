var express = require('express');
var router = express.Router();

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录，请先登录!');
        res.redirect('/login');
    }else{
        next();
    }
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('success', '你已登录！');
        res.redirect('/');//返回之前的页面
    }else{
        next();
    }
}

//未登录拦截
router.get('/users/*',checkLogin);
router.get('/faq/*',checkLogin);
router.get('/category/*',checkLogin);


module.exports = router;