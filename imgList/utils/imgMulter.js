const multer  = require('multer');

let msg = "没有选择文件"; //存放报错信息

// 磁盘存储引擎可以让你控制文件的存储。
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 上传文件得目录
        cb(null, './public/img');
    },
    filename: function (req, file, cb) {
        let {originalname} = file;
        let nameSlipt = originalname.split('.');
        let type = nameSlipt[nameSlipt.length-1];
        let fileName = new Date().getTime() + parseInt(Math.random()*9999) + "." + type;
        // console.log(fileName);
        // 上传文件的名称
        cb(null, fileName);
    }
})
  
var upload = multer({
    storage: storage,
    fileFilter:(req, file, cb)=>{
        let {mimetype} = file;
        // let size = parseInt(req.headers['content-length']);//获取到文件大小
        let imgTypes = ['jpg','jpeg','png','gif'];
        let imgType = mimetype.split('/')[1];
        // if(size > 100000){ //判断文件是否过大
        //     msg = "文件过大";
        //     cb(null, false);
        // } else 
        if(imgTypes.indexOf(imgType) == -1){ //判断文件类型是否是图片
            msg = "媒体文件格式不对";
            cb(null, false);
        } else {
            cb(null, true);
        } 
    }
});

let imgMulter = {
    upload,
    msg
}

module.exports = imgMulter;