import os

from flask import Blueprint
from flask import render_template, session, redirect, request
from werkzeug.utils import secure_filename

from flask_app_config import ALLOWED_EXTENSIONS
from flask_setting import setting
from pysrc import get_table_date
from pysrc.py_methods import create_filename

draw_app = Blueprint('draw', __name__)

UPLOAD_FOLDER = 'uploads/'


# 将flask拆分为多为py使用蓝图功能：https://blog.csdn.net/m0_37876745/article/details/95603397

@draw_app.route('/app', methods=['post', 'get'])
def my_application():
    uid = session.get('islogin')
    if uid is None or uid is False:
        return redirect('/login')
    else:
        return render_template('app.html', project_name=setting.project_name)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@draw_app.route('/upload', methods=['POST'])
def upload_file():
    f = request.files['file']
    file_name = secure_filename(f.filename)
    new_name = create_filename(file_name)
    path = os.path.join(UPLOAD_FOLDER, new_name)
    f.save(path)
    # print(get_table_date.get_tabd(path).get_data())
    return 'file uploaded successfully'
