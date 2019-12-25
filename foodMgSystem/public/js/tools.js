 // 关闭窗口方法
 function closeWindow(host, target){
    host.onclick = function(){
        target.style.display = "none"
    }
}