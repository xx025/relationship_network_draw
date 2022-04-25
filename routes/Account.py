from flask import Blueprint, render_template, request, jsonify
from flask import session
from flask_mail import Message

from flask_mail_config import mail
from flask_setting import setting
from pysrc.Account import add_new_user, check_user_pass, check_user_email, \
    update_password
from pysrc.py_methods import decode_loads, random_code, get_hash256

user = Blueprint('user', __name__)


@user.route('/send_code', methods=['post'])
def send_code():
    """
    发送验证码
    """
    if request.method == 'POST':
        data = decode_loads(request.data)
        email = data['email']
        codes = random_code.get_codes()
        code = codes['code']
        try:
            msg = Message("Hi!来自绘图的验证码", sender=setting.send_email['email'],
                          recipients=[email, ])
            msg.body = "您的验证码：" + code + '。'
            mail.send(msg)
            session['code'] = code
            session['email'] = email
            print(codes)
            return "1"
        except:
            return "0"


@user.route('/check_email', methods=['post'])
def check_email():
    if request.method == 'POST':
        data = decode_loads(request.data)
        receive_email = data['email']
        if not check_user_email(email=receive_email):
            return jsonify({"code": 1, "msg": "邮箱未被注册"})
        else:
            return jsonify({"code": 2, "msg": "邮箱已被注册"})


@user.route('/register', methods=['post', 'get'])
def register():
    if request.method == 'POST':
        data = decode_loads(request.data)
        receive_email = data['email']
        receive_password = data['password']
        receive_code = data['code']
        if (session.get('email') is not None) and (
                session.get('code') is not None):
            # 检查session对象中是否存储email 和 code , emial 用于安全性校验
            session_email = session.get('email')
            session_code = session.get('code')
            if receive_email == session_email and receive_code == session_code:
                # 检测验证码是否正确
                password = get_hash256(receive_password)
                # 将密码字段进行hash256
                if not check_user_email(email=receive_email):
                    add_new_user(email=receive_email, password=password)
                    # 向数据库添加新用户
                    return jsonify({"code": 1, "msg": "注册成功"})
                else:
                    return jsonify({"code": -1, "msg": "注册失败,邮箱已被注册"})
            else:
                return jsonify({"code": 2, "msg": "验证码错误"})
        else:
            return jsonify({"code": 3, "msg": "请获取验证码"})
    else:
        return render_template("register.html",
                               project_name=setting.project_name,
                               project_profile=setting.project_profile)


@user.route('/login', methods=['post', 'get'])
def login():
    if request.method == 'POST':
        data = decode_loads(request.data)
        receive_email = data['email']
        receive_password = data['password']
        if check_user_email(email=receive_email):
            if check_user_pass(email=receive_email,
                               password=get_hash256(receive_password)):
                session["email"] = receive_email
                session["islogin"] = True
                return jsonify({"code": 1, "msg": "登录成功"})
            else:
                return jsonify({"code": 2, "msg": "密码错误"})
        else:
            return jsonify({"code": 3, "msg": "账户不存在"})

    if request.method == 'GET':
        return render_template("login.html", project_name=setting.project_name,
                               project_profile=setting.project_profile)


@user.route('/recover_password', methods=['post', 'get'])
def recover_password():
    if request.method == 'POST':
        data = decode_loads(request.data)
        receive_email = data['email']
        receive_password = data['password']
        receive_code = data['code']
        if check_user_email(email=receive_email):
            if (session.get('email') is not None) and (
                    session.get('code') is not None):
                session_email = session.get('email')
                session_code = session.get('code')
                if receive_email == session_email and receive_code == session_code:
                    password = get_hash256(receive_password)
                    update_password(email=receive_email, password=password)
                    return jsonify({"code": 1, "msg": "修改成功"})
                else:
                    return jsonify({"code": 3, "msg": "验证码不正确"})
            else:
                return jsonify({"code": 3, "msg": "请获取验证码"})
        else:
            jsonify({"code": -1, "msg": "邮箱未注册"})
    else:
        return render_template("rpass.html", project_name=setting.project_name,
                               project_profile=setting.project_profile)


@user.route('/logout', methods=['post', 'get'])
def logout():
    if request.method == 'POST':
        session["islogin"] = False
        return jsonify({"code": 1, "msg": "已经退出登录"})
