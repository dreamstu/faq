/***
 * 汉字转拼音
 * @type {exports}
 */
var tr = require('transliteration');
var slugify = require('transliteration').slugify;

module.exports = {
    translate:{//翻译
        str2py_:function(str){
            return slugify(str, {lowercase: false, separator: '_'});// Ni_Hao_Shi_Jie
        },
        tr:function(str){
            return tr(str);// Ni Hao ,Shi Jie
        },
        str2py:function(str){
            return slugify(str);// ni-hao-shi-jie
        }
    }
};
