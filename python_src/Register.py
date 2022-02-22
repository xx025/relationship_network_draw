from python_src.Verification_Code import verification_code


# 接收参数


class register:

    def __init__(self, email, password):
        self.code_str = None
        self.code = None
        self.email = email
        self.password = password

    def get_code(self):
        vr = verification_code(self.email)
        self.code_str = vr.mail()
        self.code = vr.get_code()
        return self.code



