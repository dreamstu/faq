var db = require('./db');
var dbUtils = require('../utils/db.utils');

var Faq = function(faq){
    this.id = faq.id;
    this.title = faq.title;
    this.content = faq.content;
    this.time = faq.time;
    this.author = faq.author;
    this.state = faq.state;
    this.category = faq.category;
};

module.exports = Faq;

Faq.prototype.save = function(callback) {
    var faq = {
        title:this.title,
        content:this.content,
        time:new Date().toLocaleString(),
        author:this.author,
        state:0,
        category:this.category
    };

    var query = db.query('INSERT INTO articles SET ?',faq,function(err,result){
        if(err){
            return callback(err);
        }
        console.log('save articles success & resultId : %d',result.insertId);
        callback(null, result);//成功！err 为 null，并返回存储后的分组文档
    });

    console.log(query.sql);
};

Faq.get = function(faq,callback){
    dbUtils.buildSelectWhereSql("articles", faq, function (err, result) {
        if (err) {
            return callback(err);//失败！返回 err
        }
        console.log('get result: %d',result);
        callback(null, result);
    });
};

Faq.getCols = function(faq,cols,callback){
    dbUtils.buildSelectColWhereSql("articles",faq,cols,function(err,result){
        if(err){
            return callback(err);
        }else{
            callback(null,result);
        }
    });
};

Faq.prototype.update = function(callback){
    var faq = {
        title:this.title,
        content:this.content,
        time:new Date().toLocaleString(),
        author:this.author,
        state:0,
        category:this.category
    };
    var query = db.query('UPDATE articles SET ? where id= ?',[faq,this.id],function(err,result){
        if(err){
            return callback(err);
        }
        console.log('update articles success.');
        callback(null, result);//成功！err 为 null，并返回存储后的分组文档
    });
};

Faq.delete = function(faq,callback){
    dbUtils.buildDeleteWhereSql("articles",faq,function(err,result){
        if(err){
            return callback(err);
        }
        callback(null, result);
    });
};