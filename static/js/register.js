$(document).ready(function () {
        let ok_reg = -1;
        let email;
        let password;
        let code;

        function send_code() {
            $.ajax({
                url: "/send_code",
                type: "post",
                data: JSON.stringify({'email': email}),
                contentType: 'application/json; charset=UTF-8',
                success: function (data) {
                    console.log(data)
                    if (data === "1") {
                        $("#di_log").text('验证码已经发送到您的邮箱，请检查收件箱')
                    }
                },
                error: function (emg) {
                    console.log(emg)
                    $("#di_log").text('发送失败')
                }
            });


        }

        function register() {
            let data = {'email': email, 'password': password, 'code': code}
            console.log(data)
            $.ajax({
                url: "/register",
                type: "post",
                data: JSON.stringify(data),
                contentType: 'application/json; charset=UTF-8',
                success: function (data) {
                    if (data === "1") {
                        console.log("发送成功")
                    } else {
                        console.log("失败")
                    }
                },
                error: function (emg) {
                    console.log(emg);
                }
            });

        }

        function ok_form() {
            if (ok_reg === 1) {
                $("#submit-btn").click(function () {
                    email = $("#email").val();
                    password = $("#password").val();
                    $("#register").css("display", 'none');
                    $("#a_acc").css("display", 'block');
                    $("#id").val(email)
                    $("#id").attr("readonly", true)

                })
            }
        }

        function check_email(szMail) {
            let szReg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
            //邮箱正则匹配来自：https://blog.csdn.net/weixin_42337065/article/details/114721244
            return szReg.test(szMail);
        }

        function check_pass(cPASS) {
            return cPASS.length >= 8;

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
                        ok_form();
                    } else {
                        ok_reg = -1;
                        ok_form();
                        $("#re_pas").css("color", "red")
                        if (re_password === "") {
                            $("#re_pas").text("请重复输入一边密码");
                        } else {
                            $("#re_pas").text("两次输入的密码不相等");
                        }
                    }

                } else {
                    ok_reg = -1;
                    ok_form();
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
                ok_form();
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


        function bind_code() {
            code = $("#code").val()
        }

        $("#code").blur(function () {
            bind_code();
        })

        $("#get-code").click(function () {
            send_code();
        })

        $("#submit_code").click(function () {
            register();
        })
        $(".login_link").click(function () {
            window.location.href = "/login"
        });

    }
)
;
