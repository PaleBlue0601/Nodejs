const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');
const request =require('request');
const connect = require('./db/module/connect'); //连接数据库
const app = express();

/*
    设置中间件
 */
// 设置跨域
// cors
// app.use(cors());
//  jsonp
app.all("*", (req, res, next)=>{
    // 设置运行跨域的域名，*表示允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    // 允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    // 跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if(req.method.toLowerCase() == 'potions')
        res.send(200); //让options尝试请求快速结束
    else 
        next();
});
// 解析表单数据 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// 解析json数据 application/json
app.use(bodyParser.json());
// 传入第三方路由
const fileRouter = require('./router/fileRouter');
app.use('/file',fileRouter);
// 设置静态目录路径
app.use('/public', express.static(path.join(__dirname+"/public")));

app.get('/cors', (req, res)=>{
    request('https://www.jvtcit.com/license.txt',(error, response, body)=>{
        res.send(body);
    })
})


app.listen(3000,()=>{
    console.log("server start");
})