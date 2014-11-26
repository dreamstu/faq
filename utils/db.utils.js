var db = require('./../models/db');

module.exports = {
    buildSelectWhereSql:function(tableName,select, callback){
        var where = [];
        var values = [];

        for(var i = 0, keys = Object.keys(select), l = keys.length; i < l; i++)
        {
            where.push(db.escapeId(keys[i]) + ' = ?');
            values.push(select[keys[i]]);
        }
        where = where.join(' and ');
        if(where.trim()==''){
            where ='1=1'
        }else{
            where += " and 1 = 1"
        }
        console.log('sql:',"select * from "+tableName+" where "+where);
        db.query("select * from "+tableName+" where "+where, values, callback);
    },
    buildSelectColWhereSql:function(tableName,select,cols, callback){
        var where = [];
        var values = [];

        for(var i = 0, keys = Object.keys(select), l = keys.length; i < l; i++)
        {
            where.push(db.escapeId(keys[i]) + ' = ?');
            values.push(select[keys[i]]);
        }

        var col = '';
        for(var i= 0;i<cols.length;i++){
            col +=cols[i];
            if(i!=cols.length-1)
                col+=',';
        }

        where = where.join(' and ');
        if(where.trim()==''){
            where ='1=1'
        }else{
            where += " and 1 = 1"
        }
        console.log('sql:',"select "+col+" from "+tableName+" where "+where);
        db.query("select "+col+" from "+tableName+" where "+where, values, callback);
    },
    buildSelectWhereNotSql:function(tableName,select, callback){
        var where = [];
        var values = [];

        for(var i = 0, keys = Object.keys(select), l = keys.length; i < l; i++)
        {
            where.push(db.escapeId(keys[i]) + ' != ?');
            values.push(select[keys[i]]);
        }
        where = where.join(' and ');
        if(where.trim()==''){
            where ='1=1'
        }else{
            where += " and 1 = 1"
        }
        console.log('sql:',"select * from "+tableName+" where "+where);
        db.query("select * from "+tableName+" where "+where, values, callback);
    },
    buildSelectWhereInSql:function(tableName,where, callback){
        console.log('sql:',"select * from "+tableName+" where "+where);
        db.query("select * from "+tableName+" where "+where, callback);
    },
    buildDeleteWhereSql:function(tableName,select, callback){
        var where = [];
        var values = [];

        for(var i = 0, keys = Object.keys(select), l = keys.length; i < l; i++)
        {
            where.push(db.escapeId(keys[i]) + ' = ?');
            values.push(select[keys[i]]);
        }
        where = where.join(' and ');
        if(where.trim()==''){
            where ='1=1'
        }else{
            where += " and 1 = 1"
        }
        console.log('sql:',"DELETE from "+tableName+" where "+where);
        db.query("DELETE from "+tableName+" where "+where, values, callback);
    }
}