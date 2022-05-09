$(document).ready(function () {
        let ok_reg = -1;
        let email;
        let password;
        let code;

        function send_code() {
            $("#get-code").text('发送中')
            $.ajax({
                url: "/send_code",
                type: "post",
                data: JSON.stringify({'email': email}),
                contentType: 'application/json; charset=UTF-8',
                success: function (data) {
                    // console.log(data)
                    if (data === "1") {
                        $("#get-code").text('发送成功')
                    }
                },
                error: function (emg) {
                    // console.log(emg)
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

                    // console.log(data)
                    code = data["code"]
                    msg = data['msg']
                    if (code === 1) {
                        alert(msg)
                        location.href = "/login"
                    } else if (code === -1) {
                        alert(msg)
                        location.reload()
                    } else {
                        alert(msg)
                    }
                },
                error: function (emg) {
                    console.log(emg);
                }
            });

        }

        function ok_form() {
            if (ok_reg === 1) {
                $("#submit-btn").unbind("click");
                $("#submit-btn").click(function () {

                    //1. 点击按钮为邮箱和密码绑定值
                    email = $("#email").val();
                    password = $("#password").val();

                    //2. 点击按钮为邮箱进行重复性校验
                    let data = {'email': email}
                    $.ajax({
                        url: "/check_email",
                        type: "post",
                        data: JSON.stringify(data),
                        contentType: 'application/json; charset=UTF-8',
                        success: function (data) {
                            // console.log(data)
                            code = data["code"]
                            msg = data['msg']
                            if (code === 1) {
                                // alert(msg)
                                $("#register").css("display", 'none');
                                $("#a_acc").css("display", 'block');
                                $("#id").val(email)
                                $("#id").attr("readonly", true)
                            } else {
                                alert(msg)
                                // location.reload()
                            }
                        },
                        error: function (emg) {
                            console.log(emg);
                        }
                    });

                })
            }
        }

        function check_email(szMail) {
            let szReg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
            //邮箱正则匹配来自：https://juejin.cn/post/6844903574778937358
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
                $("#ema").text("");
                if (check_pass(password) === true) {
                    $("#pas").css("color", "green")
                    $("#pas").text("");
                    if (re_password === password) {
                        $("#re_pas").css("color", "green")
                        $("#re_pas").text("");
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


        //为submit绑定注册
        $("#submit_code").click(function () {
            $("#submit_code").unbind("click");
            register();
        })
        $(".login_link").click(function () {
            window.location.href = "/login"
        });

    }
);
