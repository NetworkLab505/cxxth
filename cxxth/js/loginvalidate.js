function showTips(){
    document.getElementById("namespan").innerHTML="<font color='red'>*</font>";
    document.getElementById("pspan").innerHTML="<font color='red'>*</font>";
}
function CheckUser() {
    var nValue=document.getElementById("username").value;
    var pValue=document.getElementById("password").value;
    if(nValue=="")
    {
        document.getElementById("namespan").innerHTML="<font color='red'><br/>用户名不能为空！</font>";
        return false;
    }
    else
    {
        document.getElementById("namespan").innerHTML="";
    }

    if(pValue=="")
    {
        document.getElementById("pspan").innerHTML="<font color='red'><br/>密码不能为空！</font>";
        return false;
    }
    else
    {
        document.getElementById("pspan").innerHTML="";
        return false;
    }
}