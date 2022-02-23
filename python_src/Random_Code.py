import time

'''
生成一个6位的随机验证码
返回一个字典对象，其中包括验证码、过期时间
'''


class random_code:

    @staticmethod
    def get_codes():
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

        return {
            'code': creat_code(),
            'expiry_time': time.time() + 5 * 3600,
        }
