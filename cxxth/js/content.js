$(function () {
    var flag;//判断新增还是修改
    var videoEditRow=undefined;
    var videodatagrid=$("#videogrid").datagrid({
        url:'json/video.json',
        method:"get",
        pagination:true,//显示分页
        pageSize:10,//每页所显示的表格数
        pageList:[10,20,30,40,50],//必须和显示的表格数成倍数关系
        fit:true,//定义页面自适应
        fitColumns:false,//有横向滚动条
        nowrap:true,//自动折行，
        border:false,
        striped:true,//隔行变色
        idField:'id',//主键
        sortName:'id',
        sortOrder:'desc',
        frozenColumns:[[{
            title:'ID',
            field:'id',
            width:120,
            sortable:true,
            checkbox:true,

        }
        ]],
        columns:[[
            {
                title:'视频序号',
                field:'videoOrder',
                align:'center',
                width:78,
                editor:{
                    type:'text'
                }
            },
            {
                title:'视频名称',
                field:'videoName',
                align:'center',
                width:100,
                editor: {
                    type: 'validatebox',
                    option: {
                        options: {
                            required: true,
                        }
                    }
                }},
            {title:'讲授者',
                align:'center',
            field:'videoInstructor',
                width:'110',
                editor:{
                type:'text',

                }
            },{
            title:'关键字',
                align:'center',
                field:'videoKeypoints',
                width:120,
                editor:{
                type:'text'
                }
            },
            {title:'视频存储地址',
                field:'videoUrl',
                align:'center',
                width:200,
                 editor:{
                type:'text'
            }
            },{
                title:'视频图片',
                field:'videoImg',
                align:'center',
                width:120,
                editor:{
                    type:'text'
                }
            },{
            title:'对应课程',
                field:'course',
                align:'center',
                width:120,
                editor:{
                type:'text'
                }
            },
            {
                title:'对应章节',
                field:'chapter',
                align:'center',
                width:120,
                editor:{
                    type:'text'
                }
            },
            {
                title:'内容简介',
                field:'videoSummary',
                align:'center',
                hidden:true,
                width:160,
                editor:{
                    type:'text',
                }
            },{
            title:'详情',
                field:'control',
                align:'center',
                width:90,
            formatter:function () {
           return '<button  style="border-radius: 8px;width: 60px;height:28px;background-color: #b7d2ff;cursor:pointer"  onclick="show()">详情</button>'
            }
        }
        ]],//显示表格中的每一行内容
        toolbar:[{
            text:'增加',
            iconCls:"icon-add",
            handler:function () {
                flag='add';
                //重置
               $('#videoForm').form('clear');
                $('#videoForm').get(0).reset();
                $('#videoDialog').dialog({
                    closed:false,
                    title:'添加视频',
                    modal:true,
                    buttons: [{
                        text:'确认',
                        iconCls:'icon-ok',
                        handler:function () {
                            
                        	if($('#videoForm').form('validate')){
                        		$.ajax({
                        			url:'CourseAction_saveCourse',
                        			type:'post',
                        			success:function (data) { 
                                        if (data) {
                                            $.messager.alert({
                                                title: '提示',
                                                msg: '操作成功'
                                            });
                                            $('#videoDialog').dialog('close');//关闭新增框
                                           
                                           
                                        } else {
                                            $.messager.alert({
                                                title: '提示',
                                                msg: '操作失败'
                                            });
                                            $('#videogrid').datagrid('reload');
                                        }
                                    }
                        		})
                        	}else{
                        		$.messager.alert('提示','请填入完整信息！','warning');
                        	}
                    }},{
                        text:'取消',
                        iconCls:'icon-cancel',
                        handler:function () {
                            $('#videoDialog').dialog('close');
                        }
                    }]
                });}
        },'-',{text:'删除',
            iconCls:"icon-remove",
            handler:function () {
                //选中一行，然后进行删除
                var rows= videodatagrid.datagrid('getSelections');
                if(rows.length>0){
                    $.messager.confirm('请确认','是否删除？',function (b) {
                        if(b){
                            var ids=[];
                            for(var i=0;i<rows.length;i++){
                                ids.push(rows[i].id);
                            }
                            $.ajax({
                                url:'CourseAction_saveCourse',
                                data:{
                                    ids:ids.join(',')
                                },
                                dataType:'json',
                                success:function(r){
                                    videodatagrid.datagrid('load');
                                    videodatagrid.datagrid('unselectAll');
                                    $.messager.show({
                                        title:'提示',
                                        msg:'删除成功！'
                                    })
                                }
                            })
                        }
                    });
                }
                else{
                    $.messager.alert('提示','请选择要删除的记录','error');
                }
                $("#videogrid").datagrid('clearSelections');//清空已经选择的行

            }},'-',{text:'编辑',
            iconCls:"icon-edit",
            handler:function () {
              var row=$('#videogrid').datagrid('getSelected');
              if( row!==null){

                  $('#videoDialog').dialog({
                      closed:false,
                      modal:true,
                      title:'修改信息',
                      buttons:[{
                          text:'确定',
                          iconCls:'icon-ok',
                          handler:function () {
                              $('#videoForm').form('clear');
                              $('#videogrid').datagrid('reload');
                              $('#videoDialog').dialog('close');
                              $.messager.alert('成功','修改成功！');
                          }
                      },{
                          text:'取消',
                          iconCls:'icon-cancel',
                          handler:function () {
                              $('#videoForm').form('clear');
                              $('#videoDialog').dialog('close');
                          }
                      }]
                  });
                    $.ajax({
                        url:'',
                        success:function () {
                              url=''+row.id;
                      $('#videoForm').form('load',row);
                        }
                    });




              }else {
                   $.messager.alert('错误','请选择一条记录');
              }
                $("#videogrid").datagrid('clearSelections');//清空已经选择的行
            }},'-',{
           text:'<input id="keypoint" class="easyui-linkbutton" type="textbox" placeholder="请输入关键字"/>',
            handler:function () {

            }
        },{text:'查询',
            iconCls:'icon-search',
            handler: function(){
                $('#div_show_p').empty();
                var items = $('#videogrid').datagrid('getRows'); // 获取所有行集合对象
                var keypointVal = $('#keypoint').val();//获取查询条件的值
                if(keypointVal.length==0)
                {
                    $.messager.alert('警告','请输入关键字','warning');
                }
                else
                {
                    $.ajax({
                        url:'',
                        success:function(){
                            for (var i = 0; i < items.length; i++)
                            {
                                var row = $('#videogrid').datagrid('getData').rows[i]; //得到单行 行对象

                                $("#div_show_p").html(row.videoKeypoints);

                                if ($("#div_show_p:contains(" + keypointVal + ")").length > 0)
                                {//因为要使用contains选择器，我就用选择了用div
                                    $('#videogrid').datagrid('selectRow', i); //选中对应的行
                                }
                            }

                        }

                    });


                }
                $("#videogrid").datagrid('clearSelections');//清空已经选择的行


            }}],
    });

$('#chapter').combobox({
    formatter:function (row) {
        return '<span class="item-text">'+row.chapter+'</span>';
    }
});
$('#course').combobox({
    formatter:function (row) {
       return '<span class="item-text">'+row.course+'</span>'
    }
});
$('#videoImg').filebox({
    buttonText:'选择图片',
    onChange:function () {
        var img=$('#videoImg').next().find('input[type=file]')[0];
        if(img.files && img.files[0]){
            //更换图片时清空图片展示内容
            $('#addimg').html('');
            for(var i=0;i<img.files.length;i++){
                var reader=new FileReader(img.files[i]);
                reader.onload=function (e) {
                    //append为在元素中的末尾添加内容
                    $('#addimg').append("<img  src='"+e.target.result+"' width='200px' />");
                };
                reader.readAsDataURL(img.files[i]);
            }
        }
    }

});
});
function show(){
    var summary=$('#videogrid').datagrid('getSelected');
    $.ajax({
        success:function () {
            $('#videoDialog').dialog('open').dialog('setTitle','详情');
            $('#videoForm').form('load',summary);
        }
    })

    

}
