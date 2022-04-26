import json
import unittest

import demjson

from pysrc.get_table_date import get_tabd, convert_graph_data

dg = get_tabd(
    file_path='C:/Users/sun/Desktop/test1/test12s3file.csv').get_data()


class TestCase(unittest.TestCase):

    def setUp(self):
        pass

    def test_case_02(self):
        data = convert_graph_data(data=dg).get_gv_nodes()
        print(data)

    def test_case_03(self):
        links = convert_graph_data(data=dg).get_gv_links()
        links=demjson.encode(links)

        print(f'{links=}')


# 大家可以认为这是一个类似于

if __name__ == "__main__":
    unittest.main()
