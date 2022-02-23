from flask import session


'''
用户注册相关
'''


class register:

    def __init__(self, email, password, code):
        self.code = code
        self.email = email
        self.password = password

    # def get_codes(self):
    #     vr = verification_code(self.email)
    #     self.code_str = vr.mail()
    #     self.code = vr.get_code()
    #     return self.code

    def check_code(self):
        codes = session['codes']
