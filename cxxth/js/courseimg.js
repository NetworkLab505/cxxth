//载入数据
	$(function() {
		var datagrid;
		$('#datagrid').datagrid({
			url:'json/courseimg.json',
			method:'get',
			
			pagination:true,   //分页
			pageSize:10,
			pageList:[10,20,30,40],
			fit:true,       //页面自适应
			fitColumns:false,   ////真正的自动展开/收缩列的大小
			border:false ,
			striped:true,
			idField:'id',
			sortName:'id',
			sortOrder:'desc',
			frozenColumns:[[{
				title:'id',
				field:'id',
				width:150,
				sortable:true,
				checkbox:true,
			}]],
			columns:[   //每列的具体内容
			          [
			           {title:'图片名称',field:'imgName',width:100,align:'center'},
			           {title:'获取路径',field:'imgUrl',width:300,align:'center'},
			           {title:'图片简介',field:'imgSummary',width:1200,align:'center'}
			          ] ],
			        toolbar:[  ////顶部工具栏的DataGrid面板
			           	
			           {
			           	text: '修改',        //文本名称
			           	iconCls:'icon-edit',    //修改图标
			           	handler:function() {   //打开修改窗口			           		
		           		  /*  $('#img-form').form('clear');*/
		                    var item = $('#datagrid').datagrid('getSelections');
		                    if(item.length!=0&&item.length==1)
		                    {
		                    	
		                    	$.ajax({
			                    url:'',			                    
			                    success:function(){
				                   $('#img-form').form('load', { 
					               	  imgName:item[0].imgName,
					               	  imgUrl:item[0].imgUrl,
					               	  imgSummary:item[0].imgSummary
					               });
			                    }	
		                    });
		                    $('#img-dialog').dialog({
			                    closed: false,
			                    modal:true,
                                title: "修改信息",
                                buttons: [{
                                          text: '确定',
                                          iconCls: 'icon-ok',
                                          handler: edit   //点击确定按钮执行修改函数
                                          }, {
                                          text: '取消',
                                          iconCls: 'icon-cancel',
                                          handler: function () {    //点击取消按钮关闭弹出框
                                               $('#img-dialog').dialog('close');                    
                                          }
                                          }]
                            });
		                    }else if(item.length>1){
		                         $.messager.alert('警告','只能选择一条记录','warning');
		                    } else
		                    {
		                    	$.messager.alert('警告','请选择一条记录','warning');
		                    }
	  		            }
			           	
 			           },'-',
			           {          //输入框
			           	text :'<input id="name"  type="textbox" placeholder="请输入图片名称"></input>',           	
                        handler: function(){ 
                        	
                        }
		              },
		              {      //查询按钮
			           	text :'查询',
			           	iconCls:'icon-search',
                        handler: function(){ 
                        	$('#div_show_p').empty();
                            var items = $('#datagrid').datagrid('getRows'); // 获取所有行集合对象 
                            var nameVal = $('#name').val();//获取查询条件的值
                            if(nameVal.length==0)
                            {
                            	$.messager.alert('警告','请输入图片名称','warning');
                            }
                            else
                            {
                            	$.ajax({
			                    url:'',			                    
			                    success:function(){
				                    for (var i = 0; i < items.length; i++)
                                    {
                                        var row = $('#datagrid').datagrid('getData').rows[i]; //得到单行 行对象
                                
                                        $("#div_show_p").html(row.imgName); 
                                        
                                        if ($("#div_show_p:contains(" + nameVal + ")").length > 0) 
                                        {//因为要使用contains选择器，我就用选择了用div
                                            $('#datagrid').datagrid('selectRow', i); //选中对应的行
                                            
                                        }
                                    }
			                    }
			                    
		                        });
                            }
                            
                            $("#datagrid").datagrid('clearSelections');//清空已经选择的行
                        }	                    
		              }
			        ]
		})
	})

//	修改信息函数
	function edit(){
		$('#img-form').form('submit', {
			url:'',
			success:function(data){
				if(data){
					$.messager.alert('信息提示','修改成功！','info');
					$('#img-dialog').dialog('close');
					$("#datagrid").datagrid('clearSelections');//清空已经选择的行
				}
				else
				{
					$.messager.alert('信息提示','修改失败！','info');
				}
			}
		});
	}
	

//图片上传与预览
function lookImg(){
    var f = $("#imgUrl").next().find('input[type=file]')[0];
        if (f.files && f.files[0]){
        // 更换图片时清空原图片展示内容
        $('#addImage').html('');
            for(var i=0;i<f.files.length;i++){
            var reader = new FileReader(f.files[i]);
                reader.onload = function(e){
                //append为在元素中的末尾添加内容
                    $('#addImage').append("<img  src='"+e.target.result+"'width='200px;'/>");
                }
                reader.readAsDataURL(f.files[i]);
             }
        }
    }

function endEdit() {
        var rows = $('#datagrid').datagrid('getRows');
        for (var i = 0; i < rows.length; i++) {
            $('#datagrid').datagrid('endEdit', i);
        }
    }