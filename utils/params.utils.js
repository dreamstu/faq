var settings = require('../settings');

/***
 * 对象的深度copy
 * @param deep
 * @param target
 * @param options
 * @returns {*}
 */
var extend = function(deep, target, options){
    for (name in options) {
        copy = options[name];
        if (deep && copy instanceof Array) {
            target[name] = extend(deep, [], copy);
        } else if (deep && copy instanceof Object) {
            target[name] = extend(deep, {}, copy);
        } else {
            target[name] = options[name];
        }
    }
    return target;
};


module.exports = function(req,_p){
    var params = {
        site:{
            name:settings.site.name,
            currUrl:req.originalUrl
        },
        title:'FAQ',
        success:req.flash('success').toString() || null,//成功消息
        error:req.flash('error').toString() || null,//失败消息
        user: req.session.user
    };

    return extend(true,params,_p);
};