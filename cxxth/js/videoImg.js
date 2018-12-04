  var datagrid;
   $(function () {
	 var videodatagrid=$("#datagrid").datagrid({
        url:'json/videoImg.json',//请求后台数据的路径
        method:'get',
        required:true,
				loadMsg:'数据加载中....',    			
				panelHeight:180,//点击倒三角
				required:true,
				fitColumns:true,    		
				mode:'remote',//后台反数据    			
        iconCls:'icon-Save',//引入图标
        pagination:true,//显示分页
        pageSize:10,//每页所显示的表格数
        pageList:[10,20,30,40,50],//必须和显示的表格数成倍数关系
        fit:true,//定义页面自适应
        fitColumns:false,//有横向滚动条
        nowrap:false,//自动折行，
        border:false,
        //idField:'id',//自动标识所选内容
        sortname:'id',//指定排序名称
        sortOrder:'desc',//按照降序排序 排序的功能需要通过后台实现，前台无法实现
        delay:500, //按照降序排序 排序的功能需要通过后台实现，前台无法实现
            columns:[[{
                title:'编号',
                align:'center',
                field:'id',
                width:80,
                sortable:true,//指定按照编号排序
                checkbox:true
             
            },{title:'视频名称',
                field:'videoName',
                align:'center',
                width:180,
                editor:{
                    type:'text',
                    options:{
                    
                    }
                }
            },
            {title:'获取路径',
                field:'videoUrl',
                width:230,
                align:'center',
                editor:{
                    type:'text',
                    options:{

                    }
                }
            },
            {title:'视频简介',
                field:'videoSummary',
                align:'center',
                width:510,
                editor:{
                    type:'text',
                    options:{

                    }
                }
            },
                {title:'详情',
                    align:'center',
                    field:'videodetails',      
                    width:200,
                formatter:function(){
                	return' <button ype="button"onclick="detail()" style="background-color: #b7d2ff;cursor: pointer;">详情</button>'
                }
                }]],//显示表格中每一列的内容               
           toolbar:[{text:'修改',
                    iconCls:"icon-edit",
                    handler:function () {
                    	 $(function editRole(){
                         	var ids=[];
                         	var rows=videodatagrid.datagrid('getSelections');
                         	if(rows.length>0){
                         		for(var i=0;i<rows.length;i++){
                         			ids.push(rows[i].id);
                         		}
                         		$('#videoInputForm').find('input[name=videoIds]').val(ids.join(','));
                         		
                         	}else{
                         		$.messager.alert('提示','请选择要编辑的记录！','error');
                         	}
                         });
                    
                             var rows=videodatagrid.datagrid('getSelections');
                             if(rows.length!=1 && rows.length!=0){
                          
                             var names=[];
                             for(var i=0;i<rows.length;i++){
                             	names.push(rows[i].name);
                             }
                             $.messager.show({
                             	msg:'只能选择一个用户进行编辑！您已经选择了'+rows.length+'个用户',title:'提示'
                             });
                             }else if(rows.length===1){
                            
                             	$('#videoInputForm').find('[name=videoName]').attr('readonly','readonly');
                             	$('#video-dialog').dialog({
                             		   closed:false,
                                	   modal:true,
                                   	   title:"修改信息",
                                   	   buttons:[{
                                  			text:"确定",
                                		
                                   		   iconCls:'icon-ok',
                                   		   handler:add    //点击确定按钮执行修改函数
                                   	   },{
                                   		   text:'取消',
                                   		   iconCls:'icon-cancel',
                                   		   handler:function(){  //点击取消按钮关闭弹出框
                                   			   $('#video-dialog').dialog('close')
                                   		   }
                                   	   
                                   	   }]});
                             	$('#videoInputForm').form('clear');
                             	$('#videoInputForm').form('load',{
                             		id:rows[0].id,
                             		videoName:rows[0].videoName,
                             		videoSummary:rows[0].videoSummary,
                             		videoUrl:rows[0].videoUrl
                             	});
                             }                             
                             }
                    },'-',{
           	text :'<input id="videoInputForm1" class="easyui-linkbutton" type="textbox" placeholder="请输入视频名称"style="border-radius:8px;border:solid #1f90bb8f 1px;"/>',
            handler: function(){ 
            	
            }
          },
                     {
           	text :'查询',
           	iconCls:'icon-search',
            handler: function(){ 
            	$('#div_show_p').empty();
                var items = $('#datagrid').datagrid('getRows'); // 获取所有行集合对象 
                var videoNameVal = $('#videoInputForm1').val();//获取查询条件的值
                
                if(videoNameVal.length==0)
                {
                	$.messager.alert('警告','请输入视频名称','warning');
                }

                else
                {
                	$.ajax({
                    url:'',			                    
                    success:function(){
	                    for (var i=0;i<items.length;i++)
                        {
                            var row=$('#datagrid').datagrid('getData').rows[i]; //得到单行 行对象
                    
                            $("#div_show_p").html(row.videoName); 

                            if($("#div_show_p:contains(" + videoNameVal + ")").length > 0) 
                            {//因为要使用contains选择器，我就用选择了用div
                                $('#datagrid').datagrid('selectRow',i); //选中对应的行
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
    });
  
   function detail(){
     	var rows=$('#datagrid').datagrid('getSelections');
          if(rows.length==1){
        	  $('#videoInputForm2').find('[name=videoName]').attr('readonly','readonly');
           	$('#video-dialog1').dialog({
                closed:false,
         	   modal:true,
         	  title:"查看详情"
            });
           	//$('#videoInputForm1').form('clear');
           	$('#videoInputForm2').form('load',{
           		//id:rows[0].id,
           		videoName1:rows[0].videoName,
                videoSummary1:rows[0].videoSummary,
                videoUrl1:rows[0].videoUrl
            	});
            }                             
   }
        function add(){
        	$('#videoInputForm').form('submit',{
        	url:'',
        	success:function(data){
        		if(data){
        			$.messager.alert('信息提示','提交成功！','info');
        			$('#video-dialog').dialog('close');
        		}
        		else
        			{
        			$.messager.alert('信息提示','提交失败！','info');
        			}
        	}
        	});
        }
         function lookImg(){
            var f = $("#img-url").next().find('input[type=file]')[0];
            if (f.files && f.files[0]){
            // 更换图片时清空原图片展示内容
            $('#addImage').html('');
                for(var i=0;i<f.files.length;i++){
                var reader = new FileReader(f.files[i]);
                    reader.onload = function(e){
                    //append为在元素中的末尾添加内容
                        $('#addImage').append("<img  src='"+e.target.result+"'width='200px;'/>");
                    };
                    reader.readAsDataURL(f.files[i]);
                 }
            }
        }
