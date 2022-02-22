

from flask import Blueprint, render_template, request

from python_src.Decode_loads import decode_loads
from setting import setting
from python_src.Register import register as py_register


user = Blueprint('user', __name__)


@user.route('/send_code', methods=['post'])
def send_code():
    if request.method == 'POST':

        data = decode_loads(request.data)
        test = getcode(email=data['email'])
        codes = test.get_codes()
        '''
         发送成功:status:1
         发送失败:status:0
        '''
        return str(codes['status'])


@user.route('/register', methods=['post', 'get'])
def register():
    if request.method == 'POST':
        data = decode_loads(request.data)
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
