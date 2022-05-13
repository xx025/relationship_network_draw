import hashlib
import json
import os
import shutil
import time

from flask import jsonify

# 一些工具方法
from flask_config import setting
from flask_db import database


def decode_loads(this_bytes) -> dict:
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
    def get_codes() -> dict:

        return {
            'code': RandomCode.__creat_code(),
            'expiry_time': time.time() + 5 * 60,
        }


def get_hash256(hash_str) -> str:
    """
    :param hash_str:
    :return: 字符串哈希值（sha256）
    """
    return hashlib.sha256(hash_str.encode('utf-8')).hexdigest()


def create_filename(filename) -> str:
    """
    生成基于时间戳的随机文件名
    :param filename: 文件原名
    :return: 基于时间戳命名后的文件名
    """
    import uuid
    ext = os.path.splitext(filename)[1]
    new_file_name = str(uuid.uuid1()) + ext
    return new_file_name


def get_demo_data() -> dict:
    """

    :return:
    """
    with open('models/jsons/DemoData.json', mode='r', encoding='utf8') as rf:
        data = json.load(rf)
    return data


def del_file(file_path) -> None:
    """
    删除文件夹内的文件
    :param file_path:
    :return: None
    """
    if os.path.exists(file_path):
        os.remove(file_path)


def put_jsonfy(code: int, msg: str):
    """
    为了便捷的将字典对象格式化为适合向客户端返回的对象

    :param code:
    :param msg:
    :return: Response
    """

    return jsonify({"code": code, "msg": msg})


ALLOWED_EXTENSIONS = {'xls', 'xlsl', 'csv'}


def allowed_file(filename):
    # 判断文件类型
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def init_project():
    # 删除文件夹
    if os.path.exists(setting.upload_folder):
        shutil.rmtree(setting.upload_folder)
        os.mkdir(setting.upload_folder)
    else:
        os.mkdir(setting.upload_folder)

    # 初始化数据库
    database.init_db()
