$(function () {
    //动态树形菜单
   var treeData=[{
    text:"目录",
       children:[{
           text:'课程管理',
           attributes:{
               url:'<iframe  frameborder="no" src="course.html" style="width:100%;height: 100%;margin:0 ;padding:0"></iframe>'
           }
       },{
        text:'章节管理',
           attributes:{
               url:'<iframe  frameborder="no" src="Chapter.html" style="width:100%;height: 100%;margin:0 ;padding:0"></iframe>'
           }
       },{
        text:'视频管理',
           attributes:{
            url:'<iframe  frameborder="no" src="video1.html" style="width:100%;height: 100%;margin:0 ;padding:0"></iframe>'
           }
       },{
        text:'图片管理',
           children:[{
            text:'课程图片',
               attributes:{
                   url:'<iframe  frameborder="no" src="Img.html" style="width:100%;height: 100%;margin:0 ;padding:0"></iframe>'
               }
           },{
            text:'视频图片',
               attributes:{
                   url:'<iframe  frameborder="no" src="videoImg.html" style="width:100%;height: 100%;margin:0 ;padding:0"></iframe>'
               }
           }]
       },{
        text:'用户管理',
           attributes:{
               url:'<iframe  frameborder="no" src="user.html" style="width:100%;height: 100%;margin:0 ;padding:0"></iframe>'
           }
       },{
        text:'系统管理',
           attributes:{
            url:'<iframe src=""></iframe>'
           }
       }]
   }];
//实例化树形菜单
    $("#tt").tree({
       data:treeData,
       collapsed:false,
        lines:false,
        //定义一个点击事件，点击显示什么样的页面
        onContextMenu:function(e,title){
           e.preventDefault();
            $('#tabsMenu').menu('show',{
                left:e.pageX,
                top:e.pageY
            }).data("tabTitle",title.text);
        },
        onClick:function (node) {
           if(node.attributes){
               Open(node.text,node.attributes.url);
           }
        }
    });
    //在右边的center区域打开菜单，新增tab
    function Open(text,url) {
        if($('#tabs').tabs('exists',text)){
            $('#tabs').tabs('select',text);
        }else{
            $('#tabs').tabs('add',{
                title:text,
                closable:true,
                content:url
            });
        }
    }
    //绑定tabs的右键菜单
    $('#tabs').tabs({
        onContextMenu:function (e,title) {
            e.preventDefault();
            $('#tabsMenu').menu('show',{
                left:e.pageX,
                top:e.pageY
            }).data('tabTitle',title);
            }
        });


    //实例化menu的onClick
    $('#tabsMenu').menu({
        onClick:function (item) {
           CloseTab(this,item.name);
        }
    });
    //几个关闭事件的实现
    function CloseTab(menu,type) {
        var curTabTitle=$(menu).data("tabTitle");
        var tabs=$('#tabs');
        if(type==="close"){
            tabs.tabs('close',curTabTitle);
            return;
        }
        var allTabs=tabs.tabs("tabs");
        var closeTabsTitle=[];
        $.each(allTabs,function () {
            var opt=$(this).panel("options");
            if(opt.closable && opt.title !=curTabTitle && type==='Other'){
                closeTabsTitle.push(opt.title);
            }else if(opt.closable && type==='All'){
                closeTabsTitle.push(opt.title);
            }
        });
        for(var i=0;i<closeTabsTitle.length;i++){
            tabs.tabs('close',closeTabsTitle[i]);
        }
    }
});
