var setting = require('../settings');
var mysql = require('mysql');
var pool  = mysql.createPool(setting.db_pool);
module.exports = pool;
