var redis = require('redis');
var path = require('path');

module.exports = {
    cookieSecret: 'faq',
    cookieName : 'qs_faq',
    db_pool:{
        host     : '',
        user     : '',
        password : '',
        database : 'faq',
        charset  : 'utf8',
        connectTimeout : 30*60,
        dateStrings: true,
        debug    : false
    },
    redis:{
        client:redis.createClient(),
        host:'localhost',
        port:'6379'
    },
    upload:{
        image_path:path.join(__dirname, '/public/content/upload/images'),
        tuya_path:path.join(__dirname, '/public/content/upload/tuya')
    },
    site:{
        name:'FAQ编辑系统'
    },
    gravatar:{
        url:'http://gravatar.duoshuo.com'
    },
    faq:{
        preview:{
            remoteUrl:'http://127.0.0.1:8088',
            remoteName:'汽配铺'
        }
    }
};