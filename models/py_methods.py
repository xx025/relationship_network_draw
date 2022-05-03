import hashlib
import os
import time

import json

from flask import jsonify


def decode_loads(this_bytes):
    """
    格式化post请求bytes为dict
    """

    try:
        return json.loads(this_bytes.decode('utf-8'))
    except:
        return {}


class RandomCode:
    """
    生成一个6位的随机验证码
    返回一个字典对象，其中包括验证码、过期时间
    """

    @staticmethod
    def __creat_code() -> str:
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
    def get_codes():

        return {
            'code': RandomCode.__creat_code(),
            'expiry_time': time.time() + 5 * 3600,
        }


def get_hash256(hash_str):
    return hashlib.sha256(hash_str.encode('utf-8')).hexdigest()


def create_filename(filename):
    '''
    生成基于时间戳的随机文件名
    :param filename: 文件原名
    :return: 文件名
    '''
    import uuid
    ext = os.path.splitext(filename)[1]
    new_file_name = str(uuid.uuid1()) + ext
    return new_file_name


def get_demo_data():
    with open('models/jsons/DemoData.json', mode='r', encoding='utf8') as rf:
        data = json.load(rf)
    return data


def del_file(file_path):
    if os.path.exists(file_path):
        os.remove(file_path)


def put_jsonfy(code: int, msg: str):
    return jsonify({"code": code, "msg": msg})


ALLOWED_EXTENSIONS = {'xls', 'xlsl', 'csv'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS