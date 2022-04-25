$(document).ready(function () {
        $("#submit-btn").click(function () {
            window.location.href = "/register"
        });


        function login() {
            let email = $("#id").val();
            let password = $("#password").val()
            let data = {'email': email, 'password': password}

            $.ajax({
                url: "/login",
                type: "post",
                data: JSON.stringify(data),
                contentType: 'application/json; charset=UTF-8',
                success: function (data) {
                    console.log(data)
                    code = data["code"]
                    msg = data["msg"]
                    if (code === 1) {
                        alert(msg)
                        location.href = '/app'
                    } else {
                        //账户不存在或者密码错误
                        alert(msg)
                    }

                },
                error: function (emg) {
                    console.log(emg);
                }

            })
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

        $("#zhmm-btn").click(function () {
            window.location.href = "/recover_password"
        });


    }
)
;