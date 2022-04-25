function check_email(szMail) {
    let szReg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    //邮箱正则匹配来自：https://juejin.cn/post/6844903574778937358
    return szReg.test(szMail);
}

function check_pass(cPASS) {
    return cPASS.length >= 8;

}

$(document).ready(function () {
        let email;
        let check_email_tag;
        let code;
        let code_send;
        let check_code_tag;
        let password;
        let check_password_tag;

        $("#email").blur(function () {
            email = $("#email").val();
            if (check_email(email)) {
                let data = {'email': email}
                $.ajax({
                    url: "/check_email",
                    type: "post",
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=UTF-8',
                    success: function (data) {
                        code = data["code"]
                        msg = data['msg']
                        console.log(data)
                        if (code !== 1) {
                            $("#mail_text").css("color", "green")
                            $("#mail_text").text("✔");
                            check_email_tag = true;
                        } else {

                            $("#mail_text").css("color", "red")
                            $("#mail_text").text("邮箱未注册");
                        }
                    },
                    error: function (emg) {
                        console.log(emg);
                    }
                });
            } else {
                //    邮箱格式不正确
                if (email === "") {
                    $("#mail_text").css("color", "red")
                    $("#mail_text").text("请输入邮箱");
                } else {
                    $("#mail_text").css("color", "red")
                    $("#mail_text").text("请输入正确的邮箱");
                }
            }
        })

        $("#code").blur(function () {
            code = $("#code").val();
            if (code_send !== true) {
                $("#code_text").text('请获取验证码')
                $("#pas").css("color", "red")
            } else {
                if (code.length === 6) {
                    $("#code_text").css("color", "green")
                    $("#code_text").text("✔");
                    check_code_tag = true
                } else {
                    $("#code_text").css("color", "red")
                    if (code === " ") {
                        $("#code_text").text('请输入验证码')
                    } else {
                        $("#code_text").text('请输入6位验证码')
                    }

                }
            }

        })

        $("#get_code").click(function () {
            if (check_email_tag === true) {
                $("#code_text").text('正在发送验证码')
                $("#code_text").css("color", "green")
                $.ajax({
                    url: "/send_code",
                    type: "post",
                    data: JSON.stringify({'email': email}),
                    contentType: 'application/json; charset=UTF-8',
                    success: function (data) {
                        // console.log(data)
                        if (data === "1") {
                            $("#code_text").text('发送成功')
                            $("#code_text").css("color", "green")
                            code_send = true;
                        } else {
                            $("#code_text").text('发送失败')
                            $("#code_text").css("color", "red")
                        }
                    },
                    error: function (emg) {
                        console.log(emg)
                    }
                });
            }
        })


        $("#password").blur(function () {
            password = $("#password").val()
            if (check_pass(password)) {
                $("#password_text").css("color", "green")
                $("#password_text").text("✔");
                check_password_tag = true
            } else {
                if (password.length === 0) {
                    $("#password_text").css("color", "red")
                    $("#password_text").text("请输入密码");
                } else if (password.length < 8) {
                    $("#password_text").css("color", "red")
                    $("#password_text").text("密码太短了");
                }
            }

        })
        $("#submit-btn").click(function () {
            if (check_code_tag && check_password_tag && check_email_tag) {

                let data = {'email': email, 'password': password, 'code': code}
                console.log(data)
                $.ajax({
                    url: "/recover_password",
                    type: "post",
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=UTF-8',
                    success: function (data) {
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

        })

    }
);
