import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
from setting import setting
import time


class verification_code:
    def __init__(self, receiver):
        email = setting.send_email
        self.sender = email['email']  # 发件人邮箱账号
        self.email_password = email['password']  # 发件人邮箱密码
        self.email_sever = email['server']  # 发件服务器地址
        self.email_port = email['port']  # 发件服务器端口号
        self.receiver = receiver  # 收件人邮箱账号，我这边发送给自己
        self.code = self.get_code()

    def mail(self):
        """
        # 此段代码来自菜鸟教程：https://www.runoob.com/python/python-email.html
        """
        try:
            msg = MIMEText(self.mail_text(), 'plain', 'utf-8')
            msg['From'] = formataddr(["Draw", self.sender])  # 括号里的对应发件人邮箱昵称、发件人邮箱账号
            msg['To'] = formataddr(["用户", self.receiver])  # 括号里的对应收件人邮箱昵称、收件人邮箱账号
            msg['Subject'] = "验证码"  # 邮件的主题，也可以说是标题

            server = smtplib.SMTP_SSL(host=self.email_sever, port=self.email_port)
            # 发件人邮箱中的SMTP服务器，端口是25
            server.login(self.sender, self.email_password)
            # 括号中对应的是发件人邮箱账号、邮箱密码
            server.sendmail(self.sender, [self.receiver, ], msg.as_string())
            # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件
            server.quit()
            # 关闭连接
        except Exception as e:  # 如果 try 中的语句没有执行，则会执行下面的 ret=False
            print(e)
            self.code['status'] = 0
            # 发送失败，标记状态
        return self.code

    def mail_text(self):
        return '您的验证码：' + self.code['code'] + ',有效期五分钟'
        # return self.code['code']

    @staticmethod
    def creat_code():
        import random
        code = []
        for i in range(6):
            if i == str(random.randint(1, 5)):
                code.append(i)
            else:
                temp = random.randint(65, 90)
                code.append(chr(temp))

        return ''.join(code)

    @staticmethod
    def get_code():
        return {
            'code': verification_code.creat_code(),
            'expiry_time': time.time() + 5 * 3600,
            'status': 1
        }


vr = verification_code('syhfr_11@163.com').mail()
print(vr)
