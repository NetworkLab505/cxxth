/**
 * Created by Administrator on 2018/11/15 0015.
 */
/**
 * Created by Administrator on 2018/11/7 0007.
 */
$(function(){
    var usereditRow = undefined;     //保存被训中行的索引
    userdata=$('#user').datagrid({
        url: './json/user.json',
        pagination: true, //显示分页工具条
        pageSize: 10,
        pageList: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ],
        fit: true,  //实现自适应，随着tabs的宽高而改变
        fitColumns : true,  //无论页面如何挤，都不会出现横线滚动条
        singSelect: true,    //单选状态
        striped : true,   //隔行换色
        maximizable:true,
        minimizable:true,
        singleSelect:false,   //用来实现全不选
        columns:[[  //两个方括号，是由于easyui的data是支持多级表头的
            {
                title: 'uid',
                field: 'uid',  //后台返回json语句的时候，对象里边的属性要和此对应
                width: 100, //必须要给出宽度，否则列出不来，最好大于50
                checkbox: true
            },{
                title: '用户名',
                field: 'username',  //后台返回json语句的时候，对象里边的属性要和此对应
                width: 100,//必须要给出宽度，否则列出不来，最好大于50
                editor: {
                    type: 'text',
                    options: {
                    }
                }
            },{
                title: '密码',
                field: 'password',
                width: 100, //必须要给出宽度，否则列出不来
                editor: {
                    type: 'text',
                    options: {

                    }
                }
            },{
                title: '重复密码',
                field: 'repassword',
                width: 100, //必须要给出宽度，否则列出不来
                hidden: true,
                editor: {
                    type: 'text',
                    options: {

                    }
                }
            },{
                title: '电话',
                field: 'telephone',
                width: 100, //必须要给出宽度，否则列出不来

                editor: {
                    type: 'text',
                    options: {

                    }
                }
            },{
                title: '邮箱',
                field: 'mail',
                width: 100, //必须要给出宽度，否则列出不来
                editor: {
                    type: 'text',
                    options: {

                    }
                }
            },{
                title: '大学',
                field: 'college',
                hidden: 'true',    //隐藏本列
                closed: false,
                width: 100 //必须要给出宽度，否则列出不来
            },
            {
                title: '所在学院',
                field: 'department',
                closed: false,
                hidden: 'true',
                width: 100 //必须要给出宽度，否则列出不来
            },
            {
                title: '专业',
                field: 'major',
                hidden: 'true',
                closed: false,
                width: 100 //必须要给出宽度，否则列出不来
            },
            {
                title: '当前IP',
                field: 'currentIP',
                hidden: 'true',
                closed: false,
                width: 100 //必须要给出宽度，否则列出不来
            },
            {
                title: '创建时间',
                field: 'createData',
                closed: false,
                hidden: 'true',
                width: 100 //必须要给出宽度，否则列出不来
            },
            {
                title: '上次登录时间',
                field: 'expireData',
                closed: false,
                hidden: 'true',
                width: 100 //必须要给出宽度，否则列出不来
            },
            {
                title: '当前登录时间',
                field: 'loginData',
                closed: false,
                hidden: 'true',
                width: 100 //必须要给出宽度，否则列出不来
            },{
                title: '状态',
                field: 'enabled',
                align: 'center',
                closed: true,
                width: 100 //必须要给出宽度，否则列出不来
            },{
                title: '详情',
                field: '详情',
                align: 'center',
                width: 100 ,//必须要给出宽度，否则列出不来
                formatter: function(value,row,index){
                    return '<button type="button" id="care1" value="详情" style="margin-left: 40px  border-radius:8px;width:90px;background-color:#b6def7;cursor:pointer;" onclick="getSelections()">详情</button>'
                }
            }
        ]],
        toolbar: [  //只能添加按钮，不能添加组件，所以有两种方法，一种是datagraid的上面在增加一个div，在div里边去查询。还有一种方法是，在下面增加一个div。
            {
                text: '增加',
                iconCls: 'icon-add',
                handler: function() {

                    $('#frame').dialog({
                        closed: false,   //打开弹框
                        align: 'center',        //使Dialog居中显示
                        model: true,
                        title: '添加用户',
                        maximizable:true,
                        minimizable:true,
                        resizable: true, //可缩放，即可以通过拖拉改变大小
                        buttons: [
                            {
                                text: '保存',
                                iconCls: 'icon-ok',
                                handler: add  //点击确定按钮，执行编辑函数
                            },
                            {
                                text: '取消',
                                iconCls: 'icon-cancel',
                                handler: function() {
                                    $('#frame').dialog('close');
                                }

                            }
                        ]
                    });
                    $("#user").datagrid('clearSelections');//清空已经选择的行
                    $('#form1').form('clear');
                }},'-',{                                           //可以在两个逗号之间增加一个单引号，中间加一个分隔符
                text: '删除',
                iconCls: 'icon-remove',
                handler: function(){
                    var rows= userdata.datagrid('getSelections');
                    var ids= [];
                    if(rows.length > 0)
                    {
                        $.messager.confirm('请确认','确定删除？',function(b){  //回调函数
                            if(b) {
                                for(var i=0;i< rows.length;i++)
                                {
                                    ids.push(rows[i].id);
                                }
                                $.ajax({
                                    url: '',
                                    data: {
                                        ids:ids.join(',')
                                    },   //将字符串数组传回去，而不是把ids传回去
                                    dataType: 'json',
                                    success: function() {
                                        userdata.datagrid('load');   //当一页中有十条数据，但是删除了两条，我们要使数据仍然显示十条，需要使用dategrid的刷新事件
                                        userdata.datagrid('unselectAll');
                                        $.messager.show({
                                            title: '提示',
                                            msg:'删除成功!'
                                        })
                                    }
                                });

                                console.info(ids.join(','));  //将字符串传到后台，调用$.ajax将数据传到后台，调用success方法
                            }
                        });
                    }else {
                        $.messager.alert('提示','请选择要删除的记录!','error');
                    }
                }

            },'-',{
                text: '修改',
                iconCls: 'icon-edit',
                handler: function() {
                    //获取所选择的的行
                    $('#form1').form('clear');
                    var selectedRow = $("#user").datagrid("getSelections");
                    if(selectedRow.length!=0 && selectedRow.length===1) {
                        $.ajax({
                            url: '',
                            success: function() {

                                $('#form1').form('load',{
                                    username:selectedRow[0].username,
                                    password:selectedRow[0].password,
                                    repassword:selectedRow[0].repassword,
                                    telephone:selectedRow[0].telephone,
                                    mail:selectedRow[0].mail,
                                    // careful:selectedRow[0].careful,
                                    college:selectedRow[0].college,
                                    department:selectedRow[0].department,
                                    major:selectedRow[0].major,
                                    currentIP:selectedRow[0].currentIP,
                                    createData:
                                    /* selectedRow[0].createData.day+*/

                                    /*+selectedRow[0].createData.nanos*/+
                                        /* +selectedRow[0].createData.time*/
                                        /* selectedRow[0].createData.timezoneOffset+*/
                                        selectedRow[0].createData.year+"-"+
                                    selectedRow[0].createData.month+"-"+
                                    selectedRow[0].createData.date+"    "+
                                    selectedRow[0].createData.hours+":"+
                                    selectedRow[0].createData.minutes+":"+
                                    selectedRow[0].createData.seconds

                                    ,

                                    expireData:
                                    selectedRow[0].expireData.year+"-"+
                                    selectedRow[0].expireData.month+"-"+
                                    selectedRow[0].expireData.date+"   "+
                                        /*selectedRow[0].expireData.day+*/
                                    selectedRow[0].expireData.hours+":"+
                                    selectedRow[0].expireData.minutes+":"+
                                    selectedRow[0].expireData.seconds
                                    /* selectedRow[0].expireData.nanos+*/

                                    /*selectedRow[0].expireData.time+*/
                                    /*selectedRow[0].expireData.timezoneOffset+*/
                                    ,
                                    loginData:
                                    selectedRow[0].loginData.year+"-"+
                                    selectedRow[0].loginData.month+"-"+
                                    selectedRow[0].loginData.date+"   "+
                                        /*selectedRow[0].loginData.day+*/
                                    selectedRow[0].loginData.hours+":"+
                                    selectedRow[0].loginData.minutes+":"+
                                    selectedRow[0].loginData.seconds
                                    /* selectedRow[0].loginData.nanos+*/

                                    /* selectedRow[0].loginData.time+*/
                                    /*selectedRow[0].loginData.timezoneOffset+*/
                                    ,

                                    enabled:selectedRow[0].enabled
                                });
                            }
                        }) ;

                        function gettime(t){
                            var _time=new Date(t);
                            var   year=_time.getFullYear();//2017
                            var   month=_time.getMonth()+1;//7
                            var   date=_time.getDate();//10
                            var   hour=_time.getHours();//10
                            var   minute=_time.getMinutes();//56
                            var   second=_time.getSeconds();//15
                            return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;//这里自己按自己需要的格式拼接
                        }




                        $('#frame').dialog({
                            closed: false,   //打开弹框
                            model: true,
                            title: '修改用户信息',
                            resizable: true, //可缩放，即可以通过拖拉改变大小
                            buttons: [
                                {
                                    text: '保存',
                                    iconCls: 'icon-ok',
                                    handler: edit  //点击确定按钮，执行编辑函数
                                },
                                {
                                    text: '取消',
                                    iconCls: 'icon-cancel',
                                    handler: function() {
                                        $('#frame').dialog('close');
                                        $("#user").datagrid('clearSelections');//清空已经选择的行
                                    }
                                }
                            ]
                        });
                        //打开窗口
                    } else if(selectedRow.length!=0 && selectedRow.length>1) {
                        $.messager.alert({
                            title: '提示',
                            msg: '只能选择一行进行编辑!'
                        });
                    }else
                    {

                        $.messager.alert({
                            title: '提示',
                            msg: '请选择要编辑的项!'
                        });
                    }
                }},'-', {
                text: '<input class="easyui-linkbutton" type="textbox"  placeholder ="请使用电话号码进行查询"  id="searchId"  style="width: 200px;background-color: whitesmoke" />',
                width: 240,
                handler: function () {

                }
            },'-', {
                iconCls: 'icon-search',
                handler: function () {
                    $('#save_user').empty();
                    var items = $('#user').datagrid('getRows');   //获取所有行集合对象
                    var nameVal= $('#searchId').val(); //获取查询条件的值
                    //alert(nameVal);   //用于测试搜索框里面的值是否能够获取到
                    if(nameVal.length ==0 ) {
                        $.messager.alert('警告','请输入电话号码进行查询!','warning');
                        //$.messager.alert('提示','修改失败!','error');
                    } else{
                        $.ajax({
                            url: '',
                            success: function() {
                                for (var i = 0; i < items.length; i++) {
                                    var row = $('#user').datagrid('getData').rows[i];  //得到单行行对
                                    $('#save_user').html(row.telephone);
                                    // $('#save_user').html(row.username);
                                    //$('#save_user').html(row.enabled);
                                    //$('#save_user').html(row.email);
                                    if ($("#save_user:contains(" + nameVal + ")").length > 0) {   //因为要使用container选择器，我就选择用div
                                        $('#user').datagrid('selectRow', i);  //选中对应的行
                                        // return;
                                    }
                                }
                            }
                        })
                    }
                    $("#user").datagrid('clearSelections');//清空已经选择的行
                }

            },'-',{
                text: '<span style="float: right; ">上线人数:&nbsp;&nbsp;&nbsp;<span id="total"">20</span>&nbsp;&nbsp;&nbsp;人</span>'
                //align: 'right'

            }
        ]
    });
});


//增加用户的确定
function add() {
    $('#form1').form('submit', {
        url: 'CourseAction_saveCourse',
        onSubmit: function () {
            var isValid = $(this).form('validate');
            if (!isValid) {
                $.messager.alert({
                    title: '消息',
                    msg: '数据验证未通过'
                });
            }
            return isValid;
        },
        success: function (data) {
            var msg = eval( 'data');
            if (!msg.success) {
                $.messager.alert({title: '提示', msg: '添加成功!'});
                $('#frame').dialog('close');
            }
            else {
                $.messager.alert({ title:'提示', msg: msg.message });
                $('#frame').dialog('close');
                $('#user').datagrid('reload');
            }
        }
    })
}
//内容修改之后的确定
function edit() {
    $('#form1').form('submit',{
        url: '',
        /*onsubmit: function() {
         var Valid = $(this).form('validate');
         if (!Valid) {
         $.messager.alert({
         title: '消息',
         msg: '数据验证未通过'
         });
         }
         return Valid;
         },*/
        success: function(row) {
            if(row) {
                $.messager.alert('提示','修改成功!','info');
                $('#frame').dialog('close');
                $('#datagrid').datagrid('clearSelections');
            }else {
                $.messager.alert('提示','修改失败!','error');
            }
        }
    })
}
//详情获取.
function getSelections(){
    var selectedRow = $("#user").datagrid("getSelections");
    if(selectedRow) {
        $.ajax({
            url: '',
            success: function() {
                //$('#frame').dialog({title:'修改用户信息'}).dialog('open');
                $('#form2').form('load',{
                    username1:selectedRow[0].username,
                    password1:selectedRow[0].password,
                    repassword1:selectedRow[0].repassword,
                    telephone1:selectedRow[0].telephone,
                    mail1:selectedRow[0].mail,
                    college1:selectedRow[0].college,
                    department1:selectedRow[0].department,
                    major1:selectedRow[0].major,
                    currentIP1:selectedRow[0].currentIP,
                    createData1:
                    /* selectedRow[0].createData.day+*/

                    /*+selectedRow[0].createData.nanos*/+
                        /* +selectedRow[0].createData.time*/
                        /* selectedRow[0].createData.timezoneOffset+*/
                        selectedRow[0].createData.year+"-"+
                    selectedRow[0].createData.month+"-"+
                    selectedRow[0].createData.date+"    "+
                    selectedRow[0].createData.hours+":"+
                    selectedRow[0].createData.minutes+":"+
                    selectedRow[0].createData.seconds

                    ,

                    expireData1:
                    selectedRow[0].expireData.year+"-"+
                    selectedRow[0].expireData.month+"-"+
                    selectedRow[0].expireData.date+"   "+
                        /*selectedRow[0].expireData.day+*/
                    selectedRow[0].expireData.hours+":"+
                    selectedRow[0].expireData.minutes+":"+
                    selectedRow[0].expireData.seconds
                    /* selectedRow[0].expireData.nanos+*/

                    /*selectedRow[0].expireData.time+*/
                    /*selectedRow[0].expireData.timezoneOffset+*/
                    ,
                    loginData1:
                    selectedRow[0].loginData.year+"-"+
                    selectedRow[0].loginData.month+"-"+
                    selectedRow[0].loginData.date+"   "+
                        /*selectedRow[0].loginData.day+*/
                    selectedRow[0].loginData.hours+":"+
                    selectedRow[0].loginData.minutes+":"+
                    selectedRow[0].loginData.seconds
                    /* selectedRow[0].loginData.nanos+*/

                    /* selectedRow[0].loginData.time+*/
                    /*selectedRow[0].loginData.timezoneOffset+*/
                    ,
                    enabled1:selectedRow[0].enabled
                });
            }
        }) ;
        $('#frame1').dialog({
            closed: false,   //打开弹框
            model: true,
            singSelect: true,    //单选状态
            title: '用户详细信息',
            maximizable:true,
            minimizable:true,
            resizable: true, //可缩放，即可以通过拖拉改变大小
            buttons: [
                {
                    text: '关闭',
                    handler: function() {
                        $('#frame1').dialog('close');
                    }
                }
            ]
        });
    }
    $("#user").datagrid('clearSelections');//清空已经选择的行
}
/*
 var unixTimestamp = new Date(5646546551*1000 ) ;
 /!*1477386005*1000*!/
 commonTime = unixTimestamp.toLocaleString();
 alert(commonTime);*/

/*
 alert(gettime(newtime));//输出2017年7月10日 10:56:15*/
