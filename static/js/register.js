$(document).ready(function () {
    $("#register-btn").click(function () {
        window.location.href = "/register"
    });


    function login() {
        let username = $("#id").val();
        let password = $("#password").val()
        console.log(username)
        console.log(password)

    }

    $("#login-btn").click(function () {
        login();
    });
    $(document).keypress(function (event) {
        //    回车键，绑定登录方法
        if (event.keyCode == 13) {
            login();
        }
    });

    $("#login").click(function () {
        window.location.href = "/login"
    });


});