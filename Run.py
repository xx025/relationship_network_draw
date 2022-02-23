from flask import Flask, render_template

from python_src.Email_Serve import email_serve
from setting import setting
from Applaction import draw_app
from Account import user

app = Flask(__name__)
app.secret_key = "lyc"
app.register_blueprint(draw_app)
app.register_blueprint(user)

email = setting.send_email

ems = email_serve(email)


@app.route('/')
def hello_world():
    print(setting.send_email)
    return render_template("index.html", project_name=setting.project_name,
                           project_profile=setting.project_profile)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
