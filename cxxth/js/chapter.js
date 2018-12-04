$(function () {
    var chapterEditRow=undefined;
    var chapterdatagrid=$("#datagrid").datagrid({
        url:'json/chapter.json',//请求后台数据的路径
        method:'get',
        iconCls:'icon-Save',//引入图标
        pagination:true,//显示分页栏
        pageSize:10,//每页所显示的数据
        pageList:[10,20,30,40,50],//必须和显示的表格数成倍数关系
        fit:true,//定义页面自适应
        fitColumns:true,//有横向滚动条
        nowarp:true,//自动折行，
        border:false,
        striped: false,   //行背景交换
        sortName:'chapter_id',//指定排序名称
        sortOrder:'asc',//按照升序排序 排序的功能需要通过后台实现，前台无法实现
        frozenColumns:[[
            { title:'编号',
                field:'chapter_id',
                width:80,
                checkbox:true

            }
        ]],
        columns:[[ {
            title:'章顺序',
            field:'chapterOrder',
            width:80,
            align:'center',
            sortable:true,//指定按照编号排序
            editor:{
                type:'text',
                options:{

                }
            }
        }, {
            title:'章名称',
            field:'chapterName',
            id:'chapterName',
            width:100,
            align:'center',
            editor:{
                type:'text',
                options:{

                }
            }
        }, {title:'章简介',
            field:'chapterSummary',
            width:100,
            align:'center',
            editor:{
                type:'text',
                options:{

                }
            }
        },{
            title:'课程',
            field:'course',
            width:100,
            align:'center',
            editor:{
                type:'text',
                options:{

                }
            }
        },{
            title: '详情',
            field:'details',
            width:100,
            align:'center',
            options:{

            },
            formatter: function(value,row,index){
                return '<button style="border-radius:8px;width:70px;background-color:#b7d2ff; cursor:pointer;" onclick="show()">详情</button>'

            }
        }
        ]],//显示表格中每一列的内容
        toolbar:[{
            id:'button_add',
            text:'增加',
            iconCls:"icon-add",
            handler:function () {
                //点击增加按钮，弹出新增窗口
                $("#standardWindow").window('open').dialog({
                    closed:false,
                    modal:true,
                    title:"添加信息",
                    buttons:[{
                        text:'确定',
                        iconCls:'icon-ok',
                        handler:add
                    },{
                        text:'取消',
                        iconCls:'icon-cancel',
                        handler:function(){
                            $('#standardWindow').dialog('close');
                            $("#datagrid").datagrid('clearSelections');
                        }
                    }]
                });
                $("#standarForm").form('clear');
            }
        },'-',{text:'删除',
            iconCls:"icon-remove",
            handler:function () {
                //选中一行，然后进行删除
                var rows= chapterdatagrid.datagrid('getSelections');
                if(rows.length>0){
                    $.messager.confirm({
                        width:250,
                        title:'请确认',
                        msg:'是否删除',
                        fn: function(b){
                            $("#datagrid").datagrid('clearSelections');
                            if (b) {
                                var ids = [];
                                for (var i = 0; i < rows.length; i++) {
                                    ids.push(rows[i].id);
                                }
                                $.ajax({
                                    url: '',
                                    data: '',
                                    success: function (r) {
                                        if (r) {
                                            $.messager.alert({
                                                width:200,
                                                title:'提示',
                                                msg:'删除成功！'
                                            });
                                            $("#datagrid").datagrid('clearSelections');
                                        } else {
                                            $.messager.alert({
                                                width:200,
                                                title:'提示',
                                                msg:'删除失败！'
                                            });
                                        }
                                        chapterdatagrid.datagrid('load');
                                        chapterdatagrid.datagrid('unselectAll');
                                    }
                                });

                            }
                        }

                    });

                }
                else{
                    $.messager.alert('提示','请选择要删除的记录','error');
                }
            }},'-',{text:'修改',
            iconCls:"icon-edit",
            handler:function () {
                var item=$("#datagrid").datagrid("getSelections");
                if(item.length &&item.length===1 ) {
                    $.ajax({
                        url: '',
                        success: function() {
                            $('#standarForm').form('load',{
                                chapterOrder:item[0].chapterOrder,
                                chapterName:item[0].chapterName,
                                chapterSummary:item[0].chapterSummary,
                                course:item[0].course
                            });
                        }
                    }) ;
                    $('#standardWindow').dialog({
                        closed: false,
                        model: true,
                        title: '修改信息',
                        buttons: [{
                            text: '确定',
                            iconCls: 'icon-ok',
                            handler: edit //点击确定按钮执行编辑函数
                        }, {
                            text: '取消',
                            iconCls: 'icon-cancel',
                            handler: function () {
                                $('#standardWindow').dialog('close');
                                $("#datagrid").datagrid('clearSelections');
                            }
                        }]
                    });
                }else if(item.length>1) {
                    $.messager.alert('提示','只能选中一条数据进行修改')
                }else {
                    $.messager.alert('提示','请选中一条数据进行修改')
                }
            }},'-',{
            text:'查询',
            iconCls:"icon-search",
            handler:function(){
                $('#div_show_p').empty();
                var items = $('#datagrid').datagrid('getRows'); // 获取所有行集合对象
                var nameVal = $('#chapterName').val();//获取查询条件的值
                if(nameVal.length===0)
                {
                    $.messager.alert('警告','请输入章节名称','warning');
                }
                else
                {
                    $.ajax({
                        url:'',
                        success:function(){
                            for (var i = 0; i < items.length; i++)
                            {
                                var row = $('#datagrid').datagrid('getData').rows[i]; //得到单行 行对象
                                $("#div_show_p").html(row.chapterName);
                                if ($("#div_show_p:contains(" + nameVal + ")").length > 0)
                                {//因为要使用contains选择器，我就用选择了用div
                                    $('#datagrid').datagrid('selectRow', i); //选中对应的行
                                }
                            }
                        }
                    });
                }
                $("#datagrid").datagrid('clearSelections');//清空已经选择的行
            }},{
            text:'<input id="chapterName" type="textbox" class="easyui-linkbutton" placeholder="请输入章节名称" style="width:200px; padding-left:5px;"/>',
            handler:function(){

            }}
        ]
    })
});

//新增的确定
function add(){
    $('#standarForm').form('submit', {
        url:'CourseAction_saveCourse',
        success: function(data){
            if (data){
                $("#standardWindow").dialog('close');
                $.messager.defaults = { ok : "确定",cancel : "取消"};
                $.messager.alert('提示','新增成功！');
                $("#datagrid").datagrid('reload');
            }else{
                $.message.show({
                    title : Error,
                    msg:result.msg
                });
            }
        }
    });
}
//内容修改的确定
function edit(){
    $('#standarForm').form('submit',{
        url:'',
        success:function(data){
            if(data){
                $.messager.alert({
                    width:200,
                    title:'提示',
                    msg:'修改成功！'
                });
                /*$.messager.alert('提示','修改成功!','info');*/
                $('#standardWindow').dialog('close');
                $('#datagrid').datagrid('clearSelections');
            }else{
                $.messager.alert('提示','修改失败!','error');
            }
        }
    });
}
//详情信息的展示
function show(){
    var item=$('#datagrid').datagrid('getSelected');
    if(item)
    {
        $.ajax({
            url: '',
            success: function () {
                $('#show').form('load',item);
            }
        });
        $('#showwindow').dialog({
            closed: false,
            model: true,
            title: '详情'
        });
    }
}