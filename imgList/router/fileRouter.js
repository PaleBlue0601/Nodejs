const express = require('express');
const imgMulter  = require('../utils/imgMulter');
const imgModue = require('../db/module/imgModue');
const delFile = require('../utils/delFile');
const router = express.Router();

// 上传文件接口
router.post("/upload", imgMulter.upload.single('img'), (req, res)=>{
    if(req.file){
        res.send({err:1,msg:"传输成功",img:req.file.path});
    } else {
        res.send({err:-1,msg:imgMulter.msg});
    }
});
/**
 * @api {post} /file/addImg 添加
 * @apiName add
 * @apiGroup File
 * 
 * @apiParam {String} name 名称
 * @apiParam {String} url 路径
 * @apiSuccess {Object} data 返回删除包含结果信息对象err:状态码，msg：返回信息
 */
router.post('/addImg', (req,res)=>{
    let{url,name} = req.body;
    imgModue.insertMany({url,name})
    .then((data)=>{
        if(data){
            res.send({err:1,msg:"添加成功"})
        }
    }).catch((err)=>{
        if(err){
            console.log(err);
            res.send({err:-1,msg:"添加失败"})
        }
    })
})
/**
 * @api {post} /file/findImg 查询
 * @apiName find
 * @apiGroup File
 * 
 * @apiParam {String} name 名称
 * @apiSuccess {Object} data 返回删除包含结果信息对象err:状态码，msg：返回信息,data:数据库返回的数据
 */
router.post('/findImg',(req,res)=>{
    let{name} = req.body;
    let selectObj = {};
    if(name){ //判断name是否为空
        selectObj = {name};
    }
    imgModue.find(selectObj)
    .then((data)=>{
        if(data){
            res.send({err:1,msg:'查询成功',lists:data})
        }
    }).catch((err)=>{
        if(err){
            console.log(err);
            res.send({err:-1,msg:"查询失败"})
        }
    })
})
/**
 * @api {post} /file/delImg 删除
 * @apiName remove
 * @apiGroup File
 * 
 * @apiParam {Array} ids _id数组
 * @apiSuccess {Object} data 返回删除包含结果信息对象err:状态码，msg：返回信息
 */
router.post('/delImg',(req,res)=>{
    let{ids} = req.body;
    ids = JSON.parse(ids); //解析JSON格式数据
    imgModue.remove({_id:ids})
    .then((data)=>{
        if(data){
            res.send({err:1,msg:"删除成功"})
        }
    }).catch((err)=>{
        if(err){
            console.log(err);
            res.send({err:-1,msg:"删除失败"})
        }
    })
})
/**
 * @api {post} /file/updataImg 上传图片
 * @apiName updata
 * @apiGroup File
 * 
 * @apiParam {String} name 名称
 * @apiParam {String} url 路径
 * @apiSuccess {Object} data 返回删除包含结果信息对象err:状态码，msg：返回信息
 */
router.post('/updataImg',(req,res)=>{
    let{url,name} = req.body;
    imgModue.update({url,name})
    .then((data)=>{
        if(data){
            res.send({err:1,msg:"修改成功"})
        }
    }).catch((err)=>{
        if(err){
            console.log(err);
            res.send({err:1,msg:"修改失败"})
        }
    })
})

/**
 * @api {post} /file/delFile 删除图片
 * @apiName delFile
 * @apiGroup File
 * 
 * @apiParam {String} imgName 图片名称
 * @apiSuccess {Object} data 返回删除包含结果信息对象err:状态码，msg：返回信息
 */
router.post('/delFile',(req,res)=>{
    let {imgName} = req.body;
    delFile('public/img/' + imgName)
    .then((data)=>{
        if(data){
            res.send(data);
        }
    }).catch((err)=>{
        if(err){
            res.send(err);
        }
    })
})

module.exports = router;

