
// 绑定关闭窗口方法
let close = $('.close');
let add = $('#add')[0]; //添加菜品的窗口的
let updata = $('#updata')[0]; //修改菜品的窗口的
closeWindow(close[0], add);
closeWindow(close[1], updata);

var table = new Vue({
    el: '#table-box',
    data:{
        lists:[],
        findObj:{}, //记录最后一次查询得对象
        inPage: 1, //当前页码数
        dataLen: 0 //记录查询返回的数据长度
    },
    methods:{
        find: (reqObj = {},pageNum = table.inPage)=>{ //查询数据库并返回数据
            $.ajax({
                type:'POST',
                url:'http://127.0.0.1:3001/food/postFind',
                data:reqObj,
                success: (data)=>{
                    data.reverse(); //数据反转
                    table.lists = [];
                    table.dataLen = data.length; //将查询返回的数组长度赋给dataLen
                    let start = (pageNum-1)*5;
                    let end = (data.length-start) > 5 ? pageNum*5 : data.length;
                    for(let i = start; i < end; i++){
                        data[i].id = (i+1);
                        table.lists.push(data[i]);
                    }
                }
            })
        },
        add: (insertObj)=>{ //向数据库添加数据
            let { name,price,desc,typename,typeid,urlImg } = insertObj;
            $.ajax({
                type:"POST",
                url:'http://127.0.0.1:3001/food/postAdd',
                data:{ name,price,desc,typename,typeid,urlImg },
                success: (data)=>{
                    // 更新数据
                    table.find();
                    if(data.err == 0){ //插入成功
                        // 清空表单
                        let inputs = document.getElementsByClassName('tx_input');
                        for(let i = 0; i < inputs.length; i++){
                            inputs[i].getElementsByTagName('input')[0].value = '';
                        }
                    }
                    let msg = data.msg;
                    alert(msg);
                }
            });
        },
        remove: (nameObj)=>{//删除数据库数据
            $.ajax({
                type:"POST",
                url:'http://127.0.0.1:3001/food/postRemove',
                data:{nameObj},
                success: (data)=>{
                    if(data.ok == 1){
                        console.log(nameObj + "删除成功");
                    }
                }
            })
        },
        updata: (indexObj,updataObj)=>{ //更新数据库数据
            $.ajax({
                type:'POST',
                url:'http://127.0.0.1:3001/food/postUpdata',
                data:{indexObj,updataObj},
                success: (data)=>{
                    if(data.ok == 1){
                        alert(name + "更新成功");
                        // 清空输入框
                        $('.price')[1].value = '';
                        $('.desc')[1].value = '';
                        $('.typename')[1] = '';
                        $('.typeid')[1] = '';
                        table.find(table.findObj); //更新数据
                    }
                }
            })
        },
        showUpdata: (_id)=>{ //显示修改信息得模块并给按钮添加点击事件
            let updataBox = document.getElementById('updata');
            updataBox.style.display = 'block';
            showMsg(_id);
            let bt_updata = document.getElementsByClassName('send')[1]; //修改按钮
            bt_updata.onclick = function(){
                onUpdata(_id);
            }
        }
    }
});

// 初始化数据
table.find();

// 页码模块 
var tail = new Vue({
    el:'#tail',
    computed:{
        pageLen:()=>{
            return Math.ceil(table.dataLen/5);
        },
        inPage: ()=>{
            return table.inPage;
        }
    },
    methods:{
        left: ()=>{ //向上翻页
            if(table.inPage <= 1){
                console.log("以是第一页");
            } else {
                table.find({}, --table.inPage);
            }
        },
        right: ()=>{ //向下翻页
            if(table.inPage >= tail.pageLen){
                console.log("以是最后一页");
            } else {
                table.find({}, ++table.inPage);
            }
        }
    }
})