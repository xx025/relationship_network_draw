from flask import Flask, render_template
from setting import setting
from applaction import my_app

app = Flask(__name__)

app.register_blueprint(my_app)


@app.route('/')
def hello_world():
    return render_template("index.html", project_name=setting.project_name,
                           project_profile=setting.project_profile)


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=80)
