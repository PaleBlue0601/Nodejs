const mongoose = require('mongoose');
// 获取Schema对象 
const imgSchema = new mongoose.Schema({
    url:{type:String,required:true}, //图片路径
    name:{type:String,required:true} //图片名称
})
// 将Schema转换为数据模型
var imgs = mongoose.model('imgs', imgSchema);

module.exports = imgs;