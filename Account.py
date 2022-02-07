from flask import Blueprint, render_template
from setting import setting
user = Blueprint('user', __name__)


@user.route('/register', methods=['post', 'get'])
def register():
    return render_template("register.html", project_name=setting.project_name,
                           project_profile=setting.project_profile)


@user.route('/login', methods=['post', 'get'])
def login():
    return render_template("login.html", project_name=setting.project_name,
                           project_profile=setting.project_profile)

