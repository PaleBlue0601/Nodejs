
function remove(){
    let th_checkBox = document.getElementsByClassName('check-box');
    let names = [];
    for(let i = 0; i < th_checkBox.length;i++){ //循环获取选择行的菜品名称
        var checkbox = th_checkBox[i].children[0];
        if(checkbox.checked){
            checkbox.checked = false;
            let addname = th_checkBox[i].parentNode.children[2].innerText; //选中对应行的菜品名称
            names.push(addname);
        }
    }
    // 删除已选数据后更新页
    let nameObj = JSON.stringify({names});
    table.remove(nameObj);
    // 更新数据
    table.find();
}