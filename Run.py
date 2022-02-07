from flask import Flask, render_template
from setting import setting
from Applaction import draw_app
from Account import user

app = Flask(__name__)

app.register_blueprint(draw_app)
app.register_blueprint(user)



@app.route('/')
def hello_world():
    return render_template("index.html", project_name=setting.project_name,
                           project_profile=setting.project_profile)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
