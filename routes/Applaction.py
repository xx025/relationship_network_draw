from flask import render_template, session, redirect, url_for

from flask import Blueprint

from flask_setting import setting

draw_app = Blueprint('draw', __name__)


# 将flask拆分为多为py使用蓝图功能：https://blog.csdn.net/m0_37876745/article/details/95603397

@draw_app.route('/app', methods=['post', 'get'])
def my_application():
    uid = session.get('uid')
    print(uid)
    if uid is None:
        return redirect('/login')
    else:
        return render_template('app.html', project_name=setting.project_name)
