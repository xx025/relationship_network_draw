from flask import Blueprint, render_template, request
from flask import session
from flask_mail import Message

from flask_config import setting
from flask_mail_c import mail
from models.Account import add_new_user, check_user_pass, check_user_email, \
    update_user_pass
from models.py_methods import decode_loads, RandomCode, get_hash256, put_jsonfy

user = Blueprint('user', __name__)


@user.route('/send_code', methods=['POST'])
def send_code():
    """
    发送验证码
    """
    if request.method == 'POST':
        data = decode_loads(request.data)
        email = data['email']
        codes = RandomCode.get_codes()
        code = codes['code']
        session['code'] = code
        session['email'] = email
        print(codes)
        msg = Message("Hi!来自绘图的验证码", sender=setting.send_email['email'],
                      recipients=[email, ])
        msg.body = "您的验证码：" + code + '。'
        try:
            mail.send(msg)
        except:
            pass
        return "1"


@user.route('/check_email', methods=['post'])
def check_email():
    if request.method == 'POST':
        data = decode_loads(request.data)
        receive_email = data['email']
        if not check_user_email(email=receive_email):
            return put_jsonfy(1, "邮箱未被注册")
        else:
            return put_jsonfy(2, "邮箱已被注册")


@user.route('/register', methods=['post', 'get'])
def register():
    if request.method == 'POST':
        data = decode_loads(request.data)
        receive_password = data['password']
        receive_code = data['code']
        if (session.get('email') is not None) and (
                session.get('code') is not None):
            # 检查session对象中是否存储email 和 code , emial 用于安全性校验
            session_email = session.get('email')
            session_code = session.get('code')
            if receive_code == session_code:
                # 检测验证码是否正确
                if not check_user_email(email=session_email):
                    password = get_hash256(receive_password)
                    # 将密码字段进行hash256
                    add_new_user(email=session_email, password=password)
                    # 向数据库添加新用户
                    return put_jsonfy(1, "注册成功")
                else:
                    return put_jsonfy(-1, "注册失败,邮箱已被注册")
            else:
                return put_jsonfy(2, "验证码错误")
        else:
            return put_jsonfy(3, "请获取验证码")
    else:
        return render_template("user/register.html",
                               project_name=setting.project_name,
                               project_profile=setting.project_profile)


@user.route('/login', methods=['post', 'get'])
def login():
    if request.method == 'POST':
        data = decode_loads(request.data)
        try:
            receive_email = data['email']
            receive_password = data['password']
            if check_user_email(email=receive_email):
                if check_user_pass(email=receive_email,
                                   password=get_hash256(receive_password)):
                    session["email"] = receive_email
                    session["islogin"] = True
                    return put_jsonfy(1, "登录成功")
                else:
                    return put_jsonfy(2, "密码错误")
            else:
                return put_jsonfy(3, "账户不存在")
        except Exception as e:
            return put_jsonfy(4, "信息不完整")

    if request.method == 'GET':
        return render_template("user/login.html", project_name=setting.project_name,
                               project_profile=setting.project_profile)


@user.route('/recover_password', methods=['post', 'get'])
def recover_password():
    if request.method == 'POST':
        data = decode_loads(request.data)
        try:
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
                        update_user_pass(email=receive_email, new_pass=password)
                        return put_jsonfy(1, "修改成功")
                    else:
                        return put_jsonfy(3, "验证码不正确")
                else:
                    return put_jsonfy(3, "请获取验证码")
            else:
                return put_jsonfy(-1, "邮箱未注册")
        except Exception as e:
            print(e)
            return put_jsonfy(4, "信息不完整")
    else:
        return render_template("user/rpass.html", project_name=setting.project_name,
                               project_profile=setting.project_profile)


@user.route('/logout', methods=['post', 'get'])
def logout():
    if request.method == 'POST':
        session["islogin"] = False
        session.clear()
        return put_jsonfy(1, "已经退出登录")
