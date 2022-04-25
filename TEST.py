import unittest

from pysrc.get_table_date import get_tabd


class TestCase(unittest.TestCase):

    def setUp(self):
        pass

    def test_case_01(self):
        dg = get_tabd(file='C:/Users/sun/Desktop/test1/test12s3file.xls')
        print(dg.get_data())

    def test_case_02(self):
        dg = get_tabd(file='C:/Users/sun/Desktop/test1/test12s3file.csv')
        print(dg.get_data())

    def test_case_03(self):
        dg = get_tabd(file='C:/Users/sun/Desktop/test1/test12s3file.xlsx')
        print(dg.get_data())


# 大家可以认为这是一个类似于

if __name__ == "__main__":
    unittest.main()
