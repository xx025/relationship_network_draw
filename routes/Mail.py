from flask import Blueprint
from flask_mail import Message

from flask_mail_config import mail

from flask_setting import setting
from pysrc.py_methods import random_code

mail_s = Blueprint('mail_s', __name__)


@mail_s.route('/send1')
def index():
    # sender 发送方哈，recipients 邮件接收方列表
    msg = Message("Hi!This is a test ", sender=setting.send_email['email'],
                  recipients=[setting.send_email['email'], ])
    # msg.body 邮件正文
    msg.body = "This is a first email" + str(random_code.get_codes())
    # msg.attach 邮件附件添加
    # msg.attach("文件名", "类型", 读取文件）
    mail.send(msg)
    print("Mail sent")
    return "Sent"
