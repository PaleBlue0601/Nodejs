
    // 添加菜品得方法
    function onAdd(){
        let name = $('.name')[0].value.trim();
        let price = $('.price')[0].value.trim();
        let desc = $('.desc')[0].value.trim();
        let typename = $('.typename')[0].value.trim();
        let typeid = $('.typeid')[0].value.trim();
        let urlImg = "";
        let insertObj = {name,price,desc,typename,typeid,urlImg};
        table.add(insertObj);
    }
    // 显示添加菜品的窗口
    function showAdd(){
        let addBox = document.getElementById('add');
        addBox.style.display = 'block';
    }

    let bt_send = document.getElementsByClassName('send')[0];
    bt_send.onclick = onAdd;
    let bt_add = document.getElementById('bt_add');
    bt_add.onclick = showAdd;