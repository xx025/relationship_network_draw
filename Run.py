
from flask_app_config import app

from routes.Account import user
from routes.Applaction import draw_app
from routes.Mail import mail_s

app.register_blueprint(draw_app)
app.register_blueprint(user)
app.register_blueprint(mail_s)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
