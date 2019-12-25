// 查询功能
function onFind(){
    let fd_key = document.getElementById('fd_key');
    let key = fd_key.value.trim();
    let reqObj = {key};
    table.findObj = reqObj;
    console.log(reqObj);
    table.find(reqObj);
}

$('#bt_find')[0].onclick = onFind;