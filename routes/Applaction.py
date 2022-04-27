import os

from flask import Blueprint, jsonify
from flask import render_template, session, redirect, request
from werkzeug.utils import secure_filename

from flask_app_config import ALLOWED_EXTENSIONS
from flask_setting import setting
from pysrc import get_table_date
from pysrc.Application import get_my_data, add_new_file, del_db_data
from pysrc.get_table_date import convert_graph_data
from pysrc.py_methods import create_filename, get_demo_data, decode_loads, del_file

draw_app = Blueprint('draw', __name__)

UPLOAD_FOLDER = 'uploads/'


# 将flask拆分为多为py使用蓝图功能：https://blog.csdn.net/m0_37876745/article/details/95603397

@draw_app.route('/app', methods=['post', 'get'])
def my_application():
    uid = session.get('islogin')
    email = session.get('email')
    if (uid is None or uid is False) or (email is None):
        return redirect('/login')
    else:
        return render_template('application/application.html', project_name=setting.project_name, email=email)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@draw_app.route('/upload', methods=['POST'])
def upload_file():
    '''
    上传文件
    :return: 上传的文件生成的json数据
    '''
    f = request.files['file']
    file_name = secure_filename(f.filename)
    new_name = create_filename(file_name)
    path = os.path.join(UPLOAD_FOLDER, new_name)
    f.save(path)
    add_new_file(email=session["email"], fpath=new_name, fname=file_name)
    return jsonify(convert_graph_data(file_path=path).get_gv_data())


@draw_app.route('/demo_data', methods=['POST', 'GET'])
def demo_data():
    return jsonify(get_demo_data())


@draw_app.route('/my_data', methods=['POST', 'GET'])
def my_data():
    if request.method == 'GET':
        # get 返回数据库中的数据列表
        return jsonify(get_my_data(email=session["email"]))
    elif request.method == 'POST':
        id = decode_loads(request.data)['id']
        filepath = UPLOAD_FOLDER + id
        return jsonify(convert_graph_data(file_path=filepath).get_gv_data())


@draw_app.route('/del_data', methods=['POST', 'GET'])
def del_data():
    if request.method == 'POST':
        id = decode_loads(request.data)['id']
        filepath = UPLOAD_FOLDER + id
        email = session['email']
        del_db_data(email=email, fpath=id)
        del_file(file_path=filepath)
        return "1"
