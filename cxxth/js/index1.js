$(function () {
    $.ajax({
        type: "GET",
        url: "json/index.json",
        dataType: "json",
        success: function (response, status, xhr) {
            /*获取图片名称*/
            var i1_str = response[0].name;
            var one_id = document.getElementById('one');
            one_id.innerHTML = i1_str;
            var i2_str = response[1].name;
            var two_id = document.getElementById('two');
            two_id.innerHTML = i2_str;
            var i3_str = response[2].name;
            var three_id = document.getElementById('three');
            three_id.innerHTML = i3_str;
            var i4_str = response[3].name;
            var four_id = document.getElementById('four');
            four_id.innerHTML = i4_str;
            var i5_str = response[4].name;
            var five_id = document.getElementById('five');
            five_id.innerHTML = i5_str;
            var i6_str = response[5].name;
            var six_id = document.getElementById('six');
            six_id.innerHTML = i6_str;
            var i7_str = response[6].name;
            var seven_id = document.getElementById('seven');
            seven_id.innerHTML = i7_str;
            var i8_str = response[7].name;
            var eight_id = document.getElementById('eight');
            eight_id.innerHTML = i8_str;
            var i9_str = response[8].name;
            var nine_id = document.getElementById('nine');
            nine_id.innerHTML = i9_str;
            var i10_str = response[9].name;
            var ten_id = document.getElementById('ten');
            ten_id.innerHTML = i10_str;
            var i11_str = response[10].name;
            var eleven_id = document.getElementById('eleven');
            eleven_id.innerHTML = i11_str;
            var i12_str = response[11].name;
            var twelve_id = document.getElementById('twelve');
            twelve_id.innerHTML = i12_str;
            var i13_str = response[12].name;
            var thirteen_id = document.getElementById('thirteen');
            thirteen_id.innerHTML = i13_str;
            var i14_str = response[13].name;
            var fourteen_id = document.getElementById('fourteen');
            fourteen_id.innerHTML = i14_str;
            var i15_str = response[14].name;
            var fifteen_id = document.getElementById('fifteen');
            fifteen_id.innerHTML = i15_str;
            var i16_str = response[15].name;
            var sixteen_id = document.getElementById('sixteen');
            sixteen_id.innerHTML = i16_str;
            var i17_str = response[16].name;
            var seventeen_id = document.getElementById('seventeen');
            seventeen_id.innerHTML = i17_str;


            /*获取点击次数*/
            var times1_str = response[0].times;
            var c1_id = document.getElementById('c1');
            c1_id.innerHTML = times1_str;

            var times2_str = response[1].times;
            var c2_id = document.getElementById('c2');
            c2_id.innerHTML = times2_str;
            var times3_str = response[2].times;
            var c3_id = document.getElementById('c3');
            c3_id.innerHTML = times3_str;
            var times4_str = response[3].times;
            var c4_id = document.getElementById('c4');
            c4_id.innerHTML = times4_str;
            var times5_str = response[4].times;
            var c5_id = document.getElementById('c5');
            c5_id.innerHTML = times5_str;
            var times6_str = response[5].times;
            var c6_id = document.getElementById('c6');
            c6_id.innerHTML = times6_str;
            var times7_str = response[6].times;
            var c7_id = document.getElementById('c7');
            c7_id.innerHTML = times7_str;
            var times8_str = response[7].times;
            var c8_id = document.getElementById('c8');
            c8_id.innerHTML = times8_str;
            var times9_str = response[8].times;
            var c9_id = document.getElementById('c9');
            c9_id.innerHTML = times9_str;
            var times10_str = response[9].times;
            var c10_id = document.getElementById('c10');
            c10_id.innerHTML = times10_str;
            var times11_str = response[10].times;
            var c11_id = document.getElementById('c11');
            c11_id.innerHTML = times11_str;
            var times12_str = response[11].times;
            var c12_id = document.getElementById('c12');
            c12_id.innerHTML = times12_str;
            var times13_str = response[12].times;
            var c13_id = document.getElementById('c13');
            c13_id.innerHTML = times13_str;
            var times14_str = response[13].times;
            var c14_id = document.getElementById('c14');
            c14_id.innerHTML = times14_str;
            var times15_str = response[14].times;
            var c15_id = document.getElementById('c15');
            c15_id.innerHTML = times15_str;
            var times16_str = response[15].times;
            var c16_id = document.getElementById('c16');
            c16_id.innerHTML = times16_str;
            var times17_str = response[16].times;
            var c17_id = document.getElementById('c17');
            c17_id.innerHTML = times17_str;


            //获取图片路径
            document.getElementById('l1').src=response[0].src;
            document.getElementById('r1').src=response[1].src;
            document.getElementById('l2').src=response[2].src;
            document.getElementById('r2').src=response[3].src;
            document.getElementById('l3').src=response[4].src;
            document.getElementById('r3').src=response[5].src;
            document.getElementById('l4').src=response[6].src;
            document.getElementById('r4').src=response[7].src;
            document.getElementById('m1').src=response[8].src;
            document.getElementById('m2').src=response[9].src;
            document.getElementById('m3').src=response[10].src;
            document.getElementById('m4').src=response[11].src;
            document.getElementById('m5').src=response[12].src;
            document.getElementById('m6').src=response[13].src;
            document.getElementById('m7').src=response[14].src;
            document.getElementById('m8').src=response[15].src;
            document.getElementById('m9').src=response[16].src;

            //获取轮播图路径
            document.getElementById('p1').src=response[17].src;
            document.getElementById('p2').src=response[18].src;
            document.getElementById('p3').src=response[19].src;
            document.getElementById('p4').src=response[20].src;




            //获取背景图片
            document.getElementById('b1').src=response[21].src;
            document.getElementById('b2').src=response[22].src;
            document.getElementById('b3').src=response[23].src;
            document.getElementById('b4').src=response[24].src;





        }
    });
});



