from flask import Flask, render_template
from setting import setting

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("index.html", project_name=setting.project_name,
                           project_profile=setting.project_profile)


@app.route('/app', methods=['post', 'get'])
def app_start():
    return render_template('app.html')


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=80)
