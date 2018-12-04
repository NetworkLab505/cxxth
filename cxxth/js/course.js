$(function () {
    var courseEditRow=undefined;
    var coursedatagrid=$("#Datagrid").datagrid({
        url:'json/center.json',//请求后台数据的路径
        method:'get',
        iconCls:'icon-Save',//引入图标
        pagination:true,//显示分页
        pageSize:10,//每页所显示的表格数
        pageList:[10,20,30,40,50],//必须和显示的表格数成倍数关系
        fit:false,//定义页面自适应
        fitColumns:true,//设置列适应
        nowarp:false,//自动折行，
        striped:true,//隔行换色
        border:false,
        singleSelect:false,
        idField:'id',//自动标识所选内容
        sortname:'id',//指定排序名称
        sortOrder:'desc',//按照降序排序 排序的功能需要通过后台实现，前台无法实现
        frozenColumns:[[ //冻结列
            {
                title:'编号',
                field:'id',//后台返回json对象的对应
                align:'center',
                sortable:true,//指定按照编号排序
                checkbox:true,//可选框
            },{title:'学习方向',
                field:'direction',
                align:'center',
                width:120,
                editor:{ //编辑器
                    type:'combobox',
                }
            },{title:'子类',
                field:'subclass',
                align:'center',
                width:100,
                editor:{
                    type:'combobox',
                }
            },{title:'层次',
                field:'grade',
                align:'center',
                width:100,
                editor:{
                    type:'combobox',
                }
            }

        ]],
        columns:[[
            {
                title:'课程名称',
                field:'courseName',
                align:'center',
                width:130,
                editor:{
                    type:'textbox',

                }
            },{
                title:'课程编号',
                field:'courseCode',
                align:'center',
                width:100,
                editor:{
                    type:'textbox',
                }
            },{
                title:'课程主讲',
                field:'speaker',
                align:'center',
                width:100,
                editor:{
                    type:'text',
                }
            },{
                title:'课程简介',
                field:'courseSummary',
                align:'center',
                hidden:'true',
                width:150,
                editor:{
                    type:'textarea',
                }
            },{
                title:'课程来源',
                field:'ownershipOfCourse',
                align:'center',
                width:100,
                editor:{
                    type:'text',
                }
            },{
                title:'课程图片',
                field:'courseImg',
                align:'center',
                width:100,
                editor:{
                    type:'text',
                }
            },{
                title:'创建时间',
                field:'createTime',
                align:'center',
                width:100,
                editor:{
                    type:'datebox',
                }
            },{
                title:'选课人数',
                field:'userNumbers',
                hidden:true,
                align:'center',
                width:100,
                editor:{
                    type:'numberbox',
                }
            },{
                title:'点击次数',
                field:'hitCount',
                hidden:true,
                align:'center',
                width:100,
                editor:{
                    type:'numbberbox',
                }
            },{
                title:'详情',
                field:'details',

                align:'center',
                width:100,
                formatter: function (val, row, index) {
                    return '<button style="border-radius: 8px;width: 70px;background-color: #b7d2ff;cursor: pointer;" class="details" onclick="ShowDetail()"  >查看详情</button>';

                },
                editor:{
                    type:'buttonbox',

                },
            }
        ]],//显示表格中每一列的内容
        toolbar:[   //头部的工具栏按钮数组
            {
                text:'增加',
                iconCls:"icon-add",
                handler:function  () {
                    $('#courseForm').form('clear');
                    $('#courseForm').get(0).reset();
                        $('#Dialog').dialog({
                            closed:false,
                            model:true,
                            title:'增加信息',
                            buttons:[{
                                text: '确定',
                                iconCls: 'icon-ok',
                                handler: add
                            },{text:'取消',
                                iconCls:'icon-cancel',
                                handler:function () {
                                    $('#Dialog').dialog('close');
                                    $('#Datagrid').datagrid('clearSelections');
                                }
                            }]
                        });
                }
            }
            ,'-',{
                text:'删除',
                iconCls:"icon-remove",
                handler:function () {
                    //选中一行，然后进行删除
                    var rows= coursedatagrid.datagrid('getSelections');
                    if(rows.length>0){
                        $.messager.confirm({
                            title:'请确认',
                            msg:'是否删除',
                            fn:function (b) {
                                $('#Datagrid').datagrid('clearSelections');
                                if(b){
                                    var ids=[];
                                    for(var i=0;i<rows.length;i++){
                                        ids.push(rows[i].id);
                                    }
                                    $.ajax({
                                        url:'',
                                        data:'',
                                        success:function(r){
                                            if (r){
                                                $.messager.alert({
                                                    title:'提示',
                                                    msg:'删除成功！'
                                                });
                                                $('#Datagrid').datagrid('clearSelections');
                                            }else {
                                                $.messager.alert({
                                                    width:200,
                                                    title:'提示',
                                                    msg:'删除失败！'
                                                });
                                            }
                                            coursedatagrid.datagrid('load');
                                            coursedatagrid.datagrid('unselectAll');
                                        }
                                    });
                                }
                            }
                        });
                    }
                    else{
                        $.messager.alert('提示','请选择要删除的记录','error');
                    }

                }},'-',{
                text:'编辑',
                iconCls:"icon-edit",
                handler:function () {
                    var row=$("#Datagrid").datagrid('getSelections');
                    if(row.length && row.length===1){
                        $.ajax({
                            url:'',
                            success:function () {
                                $('#Dialog').form('load',{
                                    direction:row[0].direction,
                                    subclass:row[0].subclass,
                                    grade:row[0].grade,
                                    courseName:row[0].courseName,
                                    courseCode:row[0].courseCode,
                                    speaker:row[0].speaker,
                                    courseSummary:row[0].courseSummary,
                                    ownershipOfCourse:row[0].ownershipOfCourse,
                                    courseImg:row[0].courseImg,
                                    createTime:row[0].createTime
                                });
                            }
                        });
                        $('#Dialog').dialog({
                            closed:false,
                            model:true,
                            title:'修改信息',
                            buttons:[{
                                text: '确定',
                                iconCls: 'icon-ok',
                                handler: edit
                            },{text:'取消',
                                iconCls:'icon-cancel',
                                handler:function () {
                                    $('#Dialog').dialog('close');
                                    $('#Datagrid').datagrid('clearSelections');
                                }
                            }]
                        });
                    } else if (row.length>1){
                        $.messager.alert('提示','只能选择一条记录进行修改！');
                    }else {
                        $.messager.alert('提示','请选择一条记录进行修改！');
                    }
                }

            },'-',
            {
                text: '<input id="condition" class="easyui-linkbutton" type="textbox" placeholder="请输入学习方向" style="line-height:26px;border-radius: 5px; border:1px solid #ccc;"> ',
                handler: function () {

                }
            },{
                text:'查找',
                iconCls:"icon-search",
                handler:function () {
                    $('#div_show_p').empty();
                    var items= $('#Datagrid').datagrid('getRows');//获取所有行集合对象
                    var conditionVal=$('#condition').val();//获取查询条件的值
                    if (conditionVal.length==0)
                    {
                        $.messager.alert('警告','请输入学习方向','warning');
                    }else {
                        $.ajax({
                            url: '',
                            success: function () {
                                for (var i = 0; i < items.length; i++) {
                                    var row = $('#Datagrid').datagrid('getData').rows[i];//得到单行行对象
                                    $('#div_show_p').html(row.direction);
                                    if ($("#div_show_p:contains("+conditionVal+")").length > 0) {//用来contains选择器
                                        $('#Datagrid').datagrid('selectRow', i);//选中对应的行
                                    }
                                }
                            }
                        });
                    }
                    $('#Datagrid').datagrid('clearSelections');//清空已经选择的行
                }}
        ],
    })
});
//显示详情
function ShowDetail (data) {
    // alert(data);
    $('#detailsForm').form('clear');
    var row=$("#Datagrid").datagrid('getSelected');
    if(row){
        $.ajax({
            url:'',
            success:function () {
                $('#detailsDialog').form('load',row);
            }
        });
        $('#detailsDialog').dialog({
            closed:false,
            model:true,
            title:'详细信息',
            buttons:[{text:'关闭',
                iconCls:'icon-cancel',
                handler:function () {
                    $('#detailsDialog').dialog('close');
                }
            }]
        });
    }
}
//增加功能
function add() {
	if($('#courseForm').form('validate')){
	   var direction=$("#direction").val();
	   var subclass=$("#subclass").val();
	   var grade=$("#grade").val();
	   var courseName = $("#courseName").val();
	   var courseCode=$("#courseCode").val();
	   var speaker=$("#speaker").val();
	   var courseSummary = $("#courseSummary").val();
	   var ownershipOfCourse = $("#ownershipOfCourse").val();
	   var courseImg = $("#courseImg").val();
	   var userNumbers = $("#userNumbers").val();
	   var hitCount = $("#hitCount").val();
	   var params = {
	            "direction":direction,
	           "subclass":subclass,
	           "grade":grade,
	           "courseName":courseName,
	           "courseCode":courseCode,
	           "speaker":speaker,
	           "courseSummary":courseSummary,
	           "ownershipOfCourse":ownershipOfCourse,
	           "courseImg":courseImg,
	           "direction":direction,
	           "userNumbers":userNumbers,
	           "hitCount":hitCount,
	 };
	   
		$.ajax({
			url:'CourseAction_saveCourse',
			type:'post',
			data:params,
			dataType:"text",
			success:function (data) {
				  $.messager.alert(data);
                if (data) {
                    $.messager.alert({
                        title: '提示',
                        msg: '添加成功'
                    });
                  
                    $('#Dialog').dialog('close');//关闭新增框
                } else {
                    $.messager.alert({
                        title: '提示',
                        msg: '操作失败'
                    });
                    $('#Dialog').datagrid('reload');
                }
            }
		})
	}else{
		$.messager.alert('提示','请填入完整信息！','warning');
	}
}
//修改功能
function edit() {
    $('#courseForm').form('submit', {
        url: '',
        success: function (data) {
            if (data) {
                $.messager.alert('提示', '修改成功', 'info');
                $('#Dialog').dialog('close');
                $('#Datagrid').datagrid('clearSelections');
                $('#Datagrid').dialog('reload');
            } else {
                $.messager.alert('提示', '修改失败', 'error');
            }
        }
    });
}