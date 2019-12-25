function addImg(){
    let name = $('#name')[0].value; //获取表单姓名
    let file = $('#file')[0].files[0];
    let formdata = new FormData(); //创建空的formdata对象
    formdata.append("img", file); //key:img
    if(name && file){
        upload(formdata,name)
    } else if(!name){
        Toast("请输入名称");
    } else if(!file){
        Toast("请选择图片");
    }
}

function upload(formdata,name){
    $.ajax({
        url:'http://localhost:3000/file/upload',
        type:'POST',
        data:formdata,
        processData: false, //必写
        contentType: false, //必写
        success:(data)=>{
            if(data.err == 1){
                let url = data.img //获取图片路径
                //路径处理
                url = url.replace(/\\/g,"/");
                url = `http://localhost:3000/${url}`;
                imgList.add({name, url}); //添加到数据库中
            } else {
                Toast(data.msg);
            } 
        }
    })
}

function showImg(){
    let label = $('#showImgMsg');
    let fileObj = $('#file')[0].files[0];
    let msg = "+点击上传文件";
    if(fileObj){
        msg = fileObj.name;
    }
    label.text(msg);
}
