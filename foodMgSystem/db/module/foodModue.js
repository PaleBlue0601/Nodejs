const mongoose = require('mongoose');
// 获取Schema对象 
const foodSchema = new mongoose.Schema({
    name: {type:String,required:true}, //名称
    price: {type:String,required:true}, //价格
    desc: {type:String,required:true}, //描述
    typename: {type:String,required:true}, //类型名称
    typeid: {type:String,required:true}, //类型id
    img: {type:String,required:false} //图片路径
});
// 将Schema转换为数据模型
var food = mongoose.model("foods", foodSchema);

module.exports = food;