from flask import Blueprint, render_template, request, session

from python_src.Decode_loads import decode_loads
from python_src.Email_Code import email_code
from setting import setting

user = Blueprint('user', __name__)


@user.route('/send_code', methods=['post'])
def send_code():
    if request.method == 'POST':
        data = decode_loads(request.data)
        codes = email_code(email=data['email']).get_codes()
        session['codes'] = codes
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
