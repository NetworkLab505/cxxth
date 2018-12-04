/*使用正则表达式进行表单校验*/
function showTips(){
    document.getElementById("respan").innerHTML="<font color='red'>*</font>";
    document.getElementById("namespan").innerHTML="<font color='red'>*</font>";
    document.getElementById("pspan").innerHTML="<font color='red'>*</font>";
    document.getElementById("mspan").innerHTML="<font color='red'>*</font>";
    document.getElementById("telespan").innerHTML="<font color='red'>*</font>";
    document.getElementById("valspan").innerHTML="<font color='red'>*</font>";


}
function CheckUser(){

    var nValue=document.getElementById("username").value;
    var pValue=document.getElementById("password").value;
    var reValue=document.getElementById("repassword").value;
    var mValue=document.getElementById("mail").value;
    var tValue=document.getElementById("telephone").value;
    var Value=document.getElementById('validate').value;
    if(nValue=="")
    {
        document.getElementById("namespan").innerHTML="<font color='red'>请输入用户名！</font>";
        return false;
    }
    else
    {
        document.getElementById("namespan").innerHTML="";
    }

    if(pValue=="")
    {
        document.getElementById("pspan").innerHTML="<font color='red'>密码不能为空！</font>";
        return false;
    }
    else
    {
        document.getElementById("pspan").innerHTML="";
    }

    if(reValue!=pValue)
    {
        document.getElementById("respan").innerHTML="<font color='red'>密码不一致！</font>";
        return false;
    }
    else{
        document.getElementById('respan').innerHTML="";
    }
    if(mValue=="")
    {
        document.getElementById('mspan').innerHTML="<font color='red'>请输入邮箱号！</font>";
        return false;
    }
   else if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(mValue))
    {
        document.getElementById('mspan').innerHTML="<font color='red'>邮箱格式不正确！</font>";
        return false;
    }

    else{
        document.getElementById('mspan').innerHTML="";
    }
    if(tValue=="")
    {
        document.getElementById('telespan').innerHTML="<font color='red'>请输入手机号！</font>";
        return false;
    }
   else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tValue))){
        document.getElementById('telespan').innerHTML="<font color='red'>手机号格式不正确！</font>";
        return false;
    }
    else {
        document.getElementById('telespan').innerHTML="";
    }
    if(Value==""){
        document.getElementById('valspan').innerHTML="<font color='red'>请输入验证码！</font>";
        return false;
    }
    else {
        document.getElementById('valspan').innerHTML="";
        return false;
    }
}