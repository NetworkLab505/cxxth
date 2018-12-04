$(function() {
    $(".btn-default").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })
    $myType_2 = 0;
    //一级分类按钮按下时触发该事件
    $('.type_1').on('click', function () {
        $myType_1 = $(this).attr('id');//获得一级分类，是前端还是后端或运维或移动开发

        $.ajax({
            type: 'GET',
            url: './json/web/'+$myType_1+'.json',
            success: function (response, status, xhr) {
                //当按钮按下时，将目前div1中所有元素清空
                $("#div1").empty();
                //用循环遍历json中所有的与该方向有关的链接
                for(i=0;i<response[0].video.length;i++){
                    $myDiv1 = $("<div></div>");
                    $myDiv1.attr("class", "col-lg-3 col-md-3 col-sm-3 col-xs-6");
                    $myDiv1.appendTo($("#div1"));

                    $myDiv2 = $("<div></div>");
                    $myDiv2.attr("class", "thumbnail");
                    $myDiv2.appendTo($myDiv1);

                    $myLink = $("<a></a>");
                    $myLink.attr("href", "ZJ.html");
                    $myLink.appendTo($myDiv2);

                    $myImg = $("<img />");
                    $myImg.attr("src", response[$myType_2].video[i].img_src);
                    $myImg.appendTo($myLink);

                    $myDiv3 = $("<div></div>");
                    $myDiv3.attr("class", "caption");
                    $myDiv3.appendTo($myLink);

                    $myH3 = $("<h3></h3>");
                    $myH3.html(response[$myType_2].video[i].text);
                    $myH3.appendTo($myDiv3);

                    $myPara = $("<p></p>");
                    $myPara.html(response[$myType_2].video[i].para);
                    $myPara.appendTo($myDiv3);
                }
            }
        });
    })
    //二级分类按钮按下时触发该事件
    $('.type_2').on('click', function () {
        $myType_2 = $(this).attr('id');
        $.ajax({
            type: 'GET',
            url: './json/web/'+$myType_1+'.json',
            success: function (response, stutas, json) {
                $("#div1").empty();
                for(i=0;i<response[$myType_2].video.length;i++){
                    $myDiv1 = $("<div></div>");
                    $myDiv1.attr("class", "col-lg-3 col-md-3 col-sm-3 col-xs-6");
                    $myDiv1.appendTo($("#div1"));

                    $myDiv2 = $("<div></div>");
                    $myDiv2.attr("class", "thumbnail");
                    $myDiv2.appendTo($myDiv1);

                    $myLink = $("<a></a>");
                    $myLink.attr("href", "ZJ.html");
                    $myLink.appendTo($myDiv2);

                    $myImg = $("<img />");
                    $myImg.attr("src", response[$myType_2].video[i].img_src);
                    $myImg.appendTo($myLink);

                    $myDiv3 = $("<div></div>");
                    $myDiv3.attr("class", "caption");
                    $myDiv3.appendTo($myLink);

                    $myH3 = $("<h3></h3>");
                    $myH3.html(response[$myType_2].video[i].text);
                    $myH3.appendTo($myDiv3);

                    $myPara = $("<p></p>");
                    $myPara.html(response[$myType_2].video[i].para);
                    $myPara.appendTo($myDiv3);
                }
            }
        });
    })
});
