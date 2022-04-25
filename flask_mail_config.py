

from flask_app_config import app
from flask_setting import setting
from flask_mail import Mail


app.config.update(
    MAIL_SERVER=setting.send_email["server"],
    MAIL_PROT=setting.send_email["port"],
    MAIL_USERNAME=setting.send_email['email'],
    MAIL_PASSWORD=setting.send_email['password'],
    MAIL_DEBUG=False
)

mail = Mail(app)


