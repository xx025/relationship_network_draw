from flask import Blueprint, render_template, request, session

from python_src.Decode_loads import decode_loads

from setting import setting

user = Blueprint('user', __name__)


@user.route('/send_code', methods=['post'])
def send_code():
    '''
    发送验证码
    '''
    if request.method == 'POST':
        data = decode_loads(request.data)
        print(data)
        return data
    else:
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
