import os

from flask import Blueprint, jsonify
from flask import render_template, session, redirect, request

from flask_config import setting
from models.Application import get_user_files, add_user_file, del_user_file
from models.get_table_date import convert_graph_data
from models.py_methods import create_filename, get_demo_data, decode_loads, del_file

draw_app = Blueprint('draw', __name__)


@draw_app.route('/app', methods=['get'])
def my_application():
    is_login = session.get('islogin')
    email = session.get('email')
    if (is_login is None or is_login is False) or (email is None):
        return redirect('/login')
    else:
        return render_template('application/application.html', project_name=setting.project_name, email=email)


@draw_app.route('/upload', methods=['POST'])
def upload_file():
    """
    上传文件
    :return: 上传的文件生成的json数据
    """
    f = request.files['file']
    # file_name = secure_filename(f.filename)
    # 由于secure_filename不能处理中文文件名
    file_name = f.filename
    new_name = create_filename(file_name)
    path = os.path.join(setting.upload_folder, new_name)
    f.save(path)
    add_user_file(email=session["email"], fpath=new_name, fname=file_name)
    return jsonify(convert_graph_data(file_path=path).get_gv_data())


@draw_app.route('/demo_data', methods=['POST', 'GET'])
def demo_data():
    return jsonify(get_demo_data())


@draw_app.route('/my_data', methods=['POST', 'GET'])
def get_data():
    if request.method == 'GET':
        # get 返回数据库中的数据列表
        return jsonify(get_user_files(email=session["email"]))
    elif request.method == 'POST':
        id = decode_loads(request.data)['id']
        filepath = setting.upload_folder + id
        return jsonify(convert_graph_data(file_path=filepath).get_gv_data())


@draw_app.route('/del_data', methods=['POST'])
def del_data():
    if request.method == 'POST':
        id = decode_loads(request.data)['id']
        filepath = setting.upload_folder + id
        email = session['email']
        del_user_file(email=email, fpath=id)
        del_file(file_path=filepath)
        return "1"
