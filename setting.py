# -*- coding:utf8 -*-
from configparser import ConfigParser


# 从config.cfg读取配置信息

class config():
    project_name = ""
    project_profile = ""

    def __init__(self):
        cp = ConfigParser()
        # 以.cfg结尾的配置文件
        cp.read('config.cfg', encoding='utf8')
        # 以.ini结尾的配置文件
        # cp.read("config.ini")
        self.project_name = cp.get("project_info", "project_name")
        self.project_profile = cp.get("project_info", "project_profile")
        self.send_email = {'email': cp.get('send_email', 'address'),
                           'password': cp.get('send_email', 'password'),
                           'server': cp.get('send_email', 'send_server'),
                           'port': cp.get('send_email', 'send_port')
                           }


setting = config()
