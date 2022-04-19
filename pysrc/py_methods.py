import json
import time


def decode_loads(this_bytes):
    """
    格式化post请求bytes为dict
    """

    try:
        return json.loads(this_bytes.decode('utf-8'))
    except:
        return {}


class random_code:
    """
    生成一个6位的随机验证码
    返回一个字典对象，其中包括验证码、过期时间
    """

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
