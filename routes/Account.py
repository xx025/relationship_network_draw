from flask import Blueprint, render_template, request
from flask_mail import Message
from flask import Flask, session
from flask_mail_config import mail
from pysrc.py_methods import decode_loads, random_code
from flask_setting import setting

user = Blueprint('user', __name__)


@user.route('/send_code', methods=['post'])
def send_code():
    """
    发送验证码
    """
    if request.method == 'POST':
        data = decode_loads(request.data)
        codes = random_code.get_codes()

        try:
            msg = Message("Hi!来自绘图的验证码", sender=setting.send_email['email'],
                          recipients=[data['email'], ])
            msg.body = "您的验证码：" + codes['code'] + '有效期五分钟。'
            mail.send(msg)
            session.items()

            return "1"
        except:
            return "0"


@user.route('/register', methods=['post', 'get'])
def register():
    if request.method == 'POST':
        data = decode_loads(request.data)

        email = data['email']
        password = data['password']
        code = data['code']

        new_user = (email, password, code)

        print(new_user)
        return "1"
    else:
        return render_template("register.html", project_name=setting.project_name,
                               project_profile=setting.project_profile)


@user.route('/login', methods=['post', 'get'])
def login():
    return render_template("login.html", project_name=setting.project_name,
                           project_profile=setting.project_profile)


@user.route('/recover_password', methods=['post', 'get'])
def recover_password():
    return render_template("recover_password.html", project_name=setting.project_name,
                           project_profile=setting.project_profile)
