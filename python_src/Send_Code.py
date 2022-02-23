'''

向邮箱发送验证码
'''
from python_src.Email_Serve import my_ems_se


class send_codes:
    def __init__(self, email):
        self.email = email

    def my_send(self):
        status = my_ems_se.mail(receiver=self.email, subject='验证码', content='111')
        return status

