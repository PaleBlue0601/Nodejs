const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test",{useUnifiedTopology:true,useNewUrlParser:true})

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'))
db.once('open',()=>{
    console.log("test数据库连接成功")
})

module.exports = db;