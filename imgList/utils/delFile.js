let delFile = function(url){
    return new Promise((resolve,rejects)=>{
        const fs = require('fs');
        fs.unlink(url,(err)=>{
            if(err){
                console.log(err);
                rejects({err:-1,msg:url + " 删除失败"});
            } else{
                resolve({err:0,msg:url+ " 删除成功"});
            }
        })
    })
}

module.exports = delFile;