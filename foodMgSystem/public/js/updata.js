function onUpdata(_id){
    let name = $('.name')[1].value.trim();
    let price = $('.price')[1].value.trim();
    let desc = $('.desc')[1].value.trim();
    let typename = $('.typename')[1].value.trim();
    let typeid = $('.typeid')[1].value.trim();
    let updataObj = {name,price,desc,typename,typeid};; //封装数据对象
    // 将对象转成JSON格式
    let indexObj = JSON.stringify({_id});
    updataObj = JSON.stringify(updataObj);
    console.log("修改对象：" + updataObj)
    table.updata(indexObj, updataObj);
}

function showMsg(_id){
    let name = $('.name')[1];
    let price = $('.price')[1];
    let desc = $('.desc')[1];
    let typename = $('.typename')[1];
    let typeid = $('.typeid')[1];
    $.post("http://localhost:3000/food/postFind",{_id},(data)=>{
        name.value = data[0].name;
        price.value = data[0].price;
        desc.value = data[0].desc;
        typename.value = data[0].typename;
        typeid.value = data[0].typeid;
    })
}