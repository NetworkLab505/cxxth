/**
 * Created by Administrator on 2018/11/4 0004.
 */
//扩展gridEdit
$.extend($.fn.datagrid.defaults.editor,{
    datetimebox : {
        init : function(container,options) {
            var editor = $('<input />').appendTo(container);
            options.editable = false;   //初始化datetimebox必须要写这句话
            editor.datetimebox(options);
            return editor;
        },
        getValue : function(target) {
            return $(target).datetimebox('getValue');
        },
        setValue : function(target,value) {
            $(target).datetimebox('setValue',value);
        },
        resize : function(target,width) {
            $(target).datetimebox('resize',width);
        },
        destory : function(target) {   //必须要写本句，否则每次添加一行都会创建一个panel，使得页面变得很乱，如果扩展的是普通文本，则不需要摧毁
            $(target).datetimebox('destory');
        }
    }
});
//检查密码和重新输入密码是相同的
// extend the 'equals' rule
$.extend($.fn.validatebox.defaults.rules, {
    equals: {
        validator: function(value,param){
            return value == $(param[0]).val();
        },
        message: '密码不一致，请重新输入!'
    }
});
//验证最少输入五个字符
$.extend($.fn.validatebox.defaults.rules, {
    minLength: {
        validator: function(value, param){
            return value.length >= param[0];
        },
        message: '至少输入5个字符'
    }
});