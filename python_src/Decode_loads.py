import json

'''
格式化post请求bytes为dict
'''


def decode_loads(this_bytes):
    try:
        return json.loads(this_bytes.decode('utf-8'))
    except:
        return {}
