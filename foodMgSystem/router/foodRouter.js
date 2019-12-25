const express = require('express');
const router = express.Router();
const food = require('../db/module/foodModue');

/**
 * @api {post} /food/postAdd 添加
 * @apiName add
 * @apiGroup Food
 *
 * @apiParam {String} name 菜品名称
 * @apiParam {String} price 菜品价格
 * @apiParam {String} desc 菜品描述
 * @apiParam {String} typename 菜品类型
 * @apiParam {String} typeid 菜品类型ID
 * @apiParam {String} urlImg 菜品图片路径
 *
 * @apiSuccess {Object} data err=0，msg="添加菜品成功".
 */
router.post('/postAdd', (req,res)=>{  //添加菜品
    let {name,price,desc,typename,typeid,urlImg} = req.body;
    let insertObj = {
        name,//名称
        price, //价格
        desc,//描述
        typename,//类型名称
        typeid,//类型id
        img: urlImg//图片路径
    }
    console.log(insertObj);
    food.find({name})
    .then((data)=>{
        if(data.length > 0){
            res.send({err:-1,msg:'菜名已存在'});
        } else {
            return food.insertMany(insertObj)
        }
    }).then((data)=>{
        if(data.length > 0){
            res.send({err:0,msg:"添加菜品成功"});
        }
    }).catch((err)=>{
        if(err){
            console.log(err);
            console.log({err:-2,msg:"发生内部错误"})
        }
    })
})

/**
 * @api {post} /food/postFind 查询 
 * @apiName find
 * @apiGroup Food
 * 
 * @apiParam {String} name 查询的菜品名称
 * @apiParam {String} typename 查询的菜品类型
 * 
 * @apiSuccess {Array} data 返回查询到的数据
 */
router.post('/postFind', (req,res)=>{
    let {key,_id} = req.body;
    let indexObj = {};//若没有参数则进行全查询
    if(_id){ //判断_id参数中是否存在
        indexObj = {_id};
    } else if(key){
        let keyRex = new RegExp(key); //模糊查询
        indexObj = {$or:[{name:{$regex:keyRex}},{desc:{$regex:keyRex}},
                    {typename:{$regex:keyRex}},{price:{$regex:keyRex}},
                    {typeid:{$regex:keyRex}}]};
    }
    food.find(indexObj).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        if(err){
            console.log("查询失败" + err)
        }
    });
})

/**
 * @api {post} /food/postRemove 删除 
 * @apiName remove
 * @apiGroup Food
 * 
 * @apiParam {String} name 删除的菜品名称
 * 
 * @apiSuccess {Object} data 返回删除包含结果信息对象
 */

router.post('/postRemove',(req,res)=>{
    let {nameObj} = req.body;
    nameObj = JSON.parse(nameObj);
    food.remove({name:nameObj.names})
    .then((data)=>{
        res.send(data);
    }).catch((err)=>{
        if(err){
            console.log("删除失败" + err)
        };
    })
})

/**
 * @api {post} /food/postUpdata 修改数据
 * @apiName updata
 * @apiGroup Food
 * 
 * @apiParam {Object} indexObj 查询的对象
 * @apiParam {Object} updataObj 更新的对象
 * 
 * @apiSuccess {Object} data 返回删除包含结果信息对象
 */

router.post('/postUpdata', (req,res)=>{
    let {indexObj,updataObj} = req.body;
    indexObj = JSON.parse(indexObj);
    updataObj = JSON.parse(updataObj);
    food.update(indexObj, updataObj)
    .then((data)=>{
        res.send(data);
    }).catch((err)=>{
        if(err){
            console.log("更新失败" + err)
        };
    });
})

module.exports = router;