from flask import Flask, render_template

from flask_setting import setting

ALLOWED_EXTENSIONS = {'xls', 'xlsl', 'csv'}

app = Flask(__name__)


app.secret_key = "lyc"


@app.route('/')
def hello_world():
    return render_template("user/home.html", project_name=setting.project_name,
                           project_profile=setting.project_profile)
