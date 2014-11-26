var express = require('express');
var router = express.Router();

var ueditor = require('ueditor');
var seetings = require('../settings');
var commUtils = require('../utils/comm.utils');
var fs = require('fs');

router.use('/ueditor',ueditor(seetings.upload.image_path+'/', function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if(req.query.action === 'uploadimage'){
        // 这里你可以获得上传图片的信息
        var foo = req.ueditor;
        //console.log(foo.filename); // exp.png
        //console.log(foo.encoding); // 7bit
        //console.log(foo.mimetype); // image/png

        // 下面填写你要把图片保存到的路径 （ 以 $path 作为根路径）
        var ext = (foo.filename).substring((foo.filename).lastIndexOf('.'),(foo.filename).length);
        var name = (foo.filename).substring(0,(foo.filename).lastIndexOf('.'));
        var img_url = commUtils.translate.str2py_(name)+ext;
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }//  客户端发起图片列表请求
    else if (req.query.action === 'listimage'){
        var dir_url = ''; // 要展示给客户端的文件夹路径
        res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
    }//客户端发起涂鸦请求
    else if(req.query.action === 'uploadscrawl'){
        // 这里你可以获得上传图片的信息
        var foo = req.body.upfile;
        var base64Data = foo.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        var imgname = Math.random()+'.png';
        var write = fs.createWriteStream(seetings.upload.tuya_path+'/'+imgname);
        write.write(dataBuffer,function(err){
            if(err){
                res.send(err);
            }else{
                res.json({
                    'url': imgname,
                    'title': 'tuya',
                    'original': imgname,
                    'state': 'SUCCESS'
                });
            }
        });
    }// 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        // 这里填写 ueditor.config.json 这个文件的路径
        res.redirect('/ueditor/ueditor.cfg.json')
    }
}));

module.exports = router;