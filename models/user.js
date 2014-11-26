var db = require('./db');
var crypto = require('crypto');
var dbUtils = require('../utils/db.utils');
var settings = require('../settings');

function User(user){
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

User.prototype.save = function(callback){
    var md5 = crypto.createHash('md5'),
    email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
    head = (settings.gravatar.url || "http://www.gravatar.com/avatar" ) + "/"+ email_MD5 + "?s=48";

    //要存入数据库的用户信息文档
    var user = {
        name : this.name,
        password : this.password,
        email : this.email,
        head : head
    }

    //var post  = {id: 1, title: 'Hello MySQL'};
    var query = db.query('INSERT INTO user SET ?', user, function(err, result) {
        if (err) {
            return callback(err);
        }
        console.log('save user success & resultId : %d',result.insertId);
        callback(null, result);//成功！err 为 null，并返回存储后的用户文档
    });

    console.log(query.sql);
}

User.get = function(user,callback){
    dbUtils.buildSelectWhereSql("user", user, function (err, result) {
        if (err) {
            return callback(err);//失败！返回 err
        }
        console.log('get result: %d',result);
        callback(null, result);//成功！返回查询的用户信息
    });
}