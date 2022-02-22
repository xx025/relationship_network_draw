from flask import session

from python_src.Verification_Code import verification_code

'''

接收一个参数email
向指定email发送验证码邮件

'''


class get_code:
    def __init__(self, email):
        self.codes = None
        self.email = email

    def get_codes(self):
        vr = verification_code(self.email)
        self.codes = vr.mail()
        # 将codes存储进flask.session
        session['codes'] = self.codes
        return self.codes
