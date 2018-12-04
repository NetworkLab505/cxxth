
function RcheckUser(){
    var rusername=document.getElementById("username").value;
    var rpassword=document.getElementById("password").value;



    if(rusername == ""||rusername==null){
        document.getElementById("userspan").innerHTML="用户名不能为空！";
        return false;
    }
    else
    {
        document.getElementById("userspan").style.visibility = "hidden";

    }

    if(rpassword == ""||rpassword==null){
        document.getElementById("psspan").innerHTML="请填写新密码！";
        return false;
    }
    else
    {
        document.getElementById("psspan").style.visibility = "hidden";

    }

}