from flask import Flask, render_template

from flask_config import setting

app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8zc]/'


@app.route('/')
def home():
    return render_template("user/home.html", project_name=setting.project_name,
                           project_profile=setting.project_profile)
