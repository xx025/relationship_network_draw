import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr

'''

邮件应该是项目初始化的时候就登录
这样可以更快的省去登录时间

'''


class email_serve:
    def __init__(self, email):
        # 发件服务的配置
        self.sender = email['email']
        # 发件人邮箱账号
        self.email_password = email['password']
        # 发件人邮箱密码
        self.server = smtplib.SMTP_SSL(host=email['server'], port=email['port'])
        # 发件人服务配置

    def mail(self, receiver, subject, content):
        """
        # 此段代码来自菜鸟教程：https://www.runoob.com/python/python-email.html

        """
        try:
            msg = MIMEText(content, 'plain', 'utf-8')
            msg['From'] = formataddr(["Draw", self.sender])
            # 括号里的对应发件人邮箱昵称、发件人邮箱账号
            msg['To'] = formataddr(["用户", receiver])
            # 括号里的对应收件人邮箱昵称、收件人邮箱账号
            msg['Subject'] = subject
            # 邮件的主题，也可以说是标题
            status = self.server.sendmail(self.sender, [receiver, ], msg.as_string())
            return status
            # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件

        except Exception as e:  # 如果 try 中的语句没有执行，则会执行下面的 ret=False
            print(e)

    def login(self):
        # 登录
        self.server.login(self.sender, self.email_password)

    def login_out(self):
        # 关闭连接
        self.server.quit()
