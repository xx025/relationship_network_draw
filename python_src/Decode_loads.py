import json

'''

格式化post请求，bytes为dict

'''


def decode_loads(this_bytes):
    return json.loads(this_bytes.decode('utf-8'))
