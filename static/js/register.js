$(document).ready(function () {


    $("#register-btn").click(function () {
        $("#register").css("display", 'none');
        $("#a_acc").css("display", 'block');
    })

    $(".login_link").click(function () {
        window.location.href = "/login"

    });


});