function re_set_location() {

    //设置居中，如果视窗足够大就居中
    var difeer_width = document.documentElement.clientWidth - $(".box_main").width();
    var difeer_height = document.documentElement.clientHeight - $(".box_main").height();

    var box1_left = 0
    var box1_top = 0


    if (difeer_width > 0) {
        box1_left += parseInt(difeer_width / 2)
    }
    if (difeer_height > 0) {
        box1_top += parseInt(difeer_height / 2)
    }
    $(".box_main").offset({top: box1_top, left: box1_left});

}

window.onresize = function () {
    re_set_location();
}
window.onload = function () {
    re_set_location();
}