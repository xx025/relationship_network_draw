$(document).ready(function () {
    let ok_reg = -1;

    function register() {
        if (ok_reg === 1) {
            $("#submit-btn").click(function () {
                let email = $("#email").val();
                let password = $("#password").val();
                $.ajax({
                    url: "/register",
                    type: "post",
                    data: JSON.stringify({'email': email, 'password': password}),
                    contentType: 'application/json; charset=UTF-8',
                    success: function (data) {
                        if (data == "1") {
                            $("#register").css("display", 'none');
                            $("#a_acc").css("display", 'block');
                        }

                    },
                    error: function (emg) {
                        console.log(emg);
                    }
                });
            })
        } else {
            $("#submit-btn").click(function () {
            });
        }
    }

    function check_email(szMail) {
        let szReg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
        //邮箱正则匹配来自：https://blog.csdn.net/weixin_42337065/article/details/114721244
        let bChk = szReg.test(szMail);
        return bChk;
    }

    function check_pass(cPASS) {
        if (cPASS.length >= 8) {
            return true;
        } else {
            return false;
        }

    }


    function check_info() {
        let email = $("#email").val();
        let password = $("#password").val();
        let re_password = $("#re_password").val();
        if (check_email(email) === true) {
            //邮箱合格
            $("#ema").css("color", "green")
            $("#ema").text("✔");
            if (check_pass(password) === true) {
                $("#pas").css("color", "green")
                $("#pas").text("✔");
                if (re_password === password) {
                    $("#re_pas").css("color", "green")
                    $("#re_pas").text("✔");
                    ok_reg = 1;
                    register();
                } else {
                    ok_reg = -1;
                    register();
                    $("#re_pas").css("color", "red")
                    if (re_password == "") {
                        $("#re_pas").text("请重复输入一边密码");
                    } else {
                        $("#re_pas").text("两次输入的密码不相等");
                    }
                }

            } else {
                ok_reg = -1;
                register();
                if (password.length === 0) {
                    $("#pas").css("color", "red")
                    $("#pas").text("请输入密码");
                } else if (password.length < 8) {
                    $("#pas").css("color", "red")
                    $("#pas").text("密码太短了");
                }
            }
        } else {
            ok_reg = -1
            register();
            if (email === "") {
                $("#ema").css("color", "red")
                $("#ema").text("请输入邮箱");
            } else {
                $("#ema").css("color", "red")
                $("#ema").text("请输入正确的邮箱");
            }
        }

    }

    $("#email").blur(function () {
        check_info();
    })
    $("#re_password").blur(function () {
        check_info();
    })
    $("#password").blur(function () {
        check_info();
    })
    $(".login_link").click(function () {
        window.location.href = "/login"
    });


});
