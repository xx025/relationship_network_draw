from flask import Flask, render_template

from setting import setting

app = Flask(__name__)

app.secret_key = "lyc"


@app.route('/')
def hello_world():
    return render_template("index.html", project_name=setting.project_name,
                           project_profile=setting.project_profile)
