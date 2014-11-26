var db = require('./db');
var dbUtils = require('../utils/db.utils');

var Category = function(category){
    this.name = category.name;
    this.pid = category.pid;
    this.root = category.root;
};

module.exports = Category;

Category.prototype.save = function(callback) {
    var category = {
        name:this.name,
        pid:this.pid,
        root:this.root
    };

    console.log(category);

    var query = db.query('INSERT INTO category SET ?',category,function(err,result){
        if(err){
            return callback(err);
        }
        console.log('save category success & resultId : %d',result.insertId);
        callback(null, result);//成功！err 为 null，并返回存储后的分组文档
    });

    console.log(query.sql);
};

Category.get = function(category,callback){
    dbUtils.buildSelectWhereSql("category", category, function (err, result) {
        if (err) {
            return callback(err);//失败！返回 err
        }
        console.log('get result: %d',result);
        callback(null, result);//成功！返回查询的分组信息
    });
};

Category.getIn = function(where,callback){
    dbUtils.buildSelectWhereInSql("category", where, function (err, result) {
        if (err) {
            return callback(err);//失败！返回 err
        }
        console.log('get result: %d',result);
        callback(null, result);//成功！返回查询的分组信息
    });
};

Category.getCols = function(category,cols,callback){
    dbUtils.buildSelectColWhereSql("category",category,cols,function(err,result){
        if(err){
            return callback(err);
        }else{
            callback(null,result);
        }
    });
};

Category.getFirst = function(category,callback){
    dbUtils.buildSelectWhereNotSql("category", category, function (err, result) {
        if (err) {
            return callback(err);//失败！返回 err
        }
        console.log('get result: %d',result);
        callback(null, result);//成功！返回查询的分组信息
    });
};