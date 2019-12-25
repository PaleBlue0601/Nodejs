
var imgList = new Vue({
    el: '#list',
    data:{
        lists:[]
    },
    methods:{
        find: (name="")=>{ //查询
            $.ajax({
                type:'post',
                url:'http://localhost:3000/file/findImg',
                data:{name},
                success:(data)=>{
                    data.lists.reverse();
                    for(let i = 0; i < data.lists.length; i++){
                        data.lists[i].id = (i+1); //设置数据id
                        data.lists[i].state = false; //设置数据close图标显示状态,默认不显示
                    }
                    imgList.lists = data.lists;
                }
            })
        },
        add:(beanImg)=>{ //添加
            $.ajax({
                type:'post',
                url:'http://localhost:3000/file/addImg',
                data:beanImg,
                success:(data)=>{
                    imgList.find(); //更新数据
                    Toast(data.msg);
                    // 清空输入框
                    $('#name')[0].value = "";
                }
            })
        },
        del:(ids=[])=>{ //删除
            ids = JSON.stringify(ids); //封装JSON数据
            $.ajax({
                type:'post',
                url:'http://localhost:3000/file/delImg',
                data:{ids},
                success:(data)=>{
                    imgList.find(); //更新数据
                    Toast(data.msg)
                }
            })
        },
        updata:(beanImg)=>{ //修改
            $.ajax({
                type:'post',
                url:'http://localhost:3000/file/updataImg',
                data:beanImg,
                success:(data)=>{
                    imgList.find(beanImg.name);//更新数据
                    Toast(data.msg)
                }
            })
        },
        delFile:(imgName)=>{  //删除文件
            $.ajax({
                type:'post',
                url:'http://localhost:3000/file/delFile',
                data:{imgName},
                success:(data)=>{
                    if(data.err == 0){
                        console.log(imgName + "删除成功")
                    } else {
                        console.log(imgName + "删除失败")
                    }
                }
            })
        },
        toggleColse:(index, state)=>{ //显示点击的.close图标
            let closeDiv = $('.close')[index];
            if(state){
                closeDiv.style.display = "none";  
                imgList.lists[index].state = false;
            } else {
                closeDiv.style.display = "block";  
                imgList.lists[index].state = true;
            }
        },
        delImg: (_id,url)=>{ //删除文件
            let ids = [_id];
            imgList.del(ids);
            let pathNames = url.split('/'); //以‘/’分割路径
            let imgName = pathNames[pathNames.length-1]; //获取到图片名称
            imgList.delFile(imgName); //删除目标文件
            imgList.find();
        }
    }
})
// 初始化数据
imgList.find();

