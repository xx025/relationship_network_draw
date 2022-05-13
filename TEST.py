import unittest

from models.get_table_date import convert_graph_data, get_table_data

global dg


class TestCase(unittest.TestCase):

    def setUp(self):
        pass

    def test_case_01(self):
        gvd = get_table_data(file_path='C:/Users/sun/Desktop/灰太狼家族.xlsx').get_data()
        print(gvd)

    def test_case_02(self):
        gvd = convert_graph_data(file_path='C:/Users/sun/Desktop/灰太狼家族.xlsx').get_gv_data()
        print(gvd)


# 大家可以认为这是一个类似于

if __name__ == "__main__":
    unittest.main()
