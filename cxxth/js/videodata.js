$(function () {
    $.getJSON('json/video.json', function (response, status, xhr) {
        var chapter1_str = response[0].chapter1;
        var a1_id = document.getElementById('a1');
        a1_id.innerText = chapter1_str;

        document.getElementById('a2').innerText = response[1].chapter2;
        document.getElementById('a3').innerText = response[2].chapter3;
        document.getElementById('a4').innerText = response[3].chapter4;
        document.getElementById('a5').innerText = response[4].chapter5;
        document.getElementById('a6').innerText = response[5].chapter6;

        document.getElementById("b1").innerText = response[0].one1;
        document.getElementById("b2").innerText = response[0].two1;
        document.getElementById("b3").innerText = response[0].three1;
        document.getElementById("b4").innerText = response[0].four1;

        document.getElementById("c1").innerText = response[1].one2;
        document.getElementById("c2").innerText = response[1].two2;
        document.getElementById("c3").innerText = response[1].three2;

        document.getElementById("d1").innerText = response[2].one3;
        document.getElementById("d2").innerText = response[2].two3;
        document.getElementById("d3").innerText = response[2].three3;
        document.getElementById("d4").innerText = response[2].four3;

        document.getElementById("e1").innerText = response[3].one4;
        document.getElementById("e2").innerText = response[3].two4;
        document.getElementById("e3").innerText = response[3].three4;

        document.getElementById("f1").innerText = response[4].one5;
        document.getElementById("f2").innerText = response[4].two5;
        document.getElementById("f3").innerText = response[4].three5;
        document.getElementById("f4").innerText = response[4].four5;

        document.getElementById("g1").innerText = response[5].one6;
        document.getElementById("g2").innerText = response[5].two6;
        document.getElementById("g3").innerText = response[5].three6;
        document.getElementById("g4").innerText = response[5].four6;
    })
});




