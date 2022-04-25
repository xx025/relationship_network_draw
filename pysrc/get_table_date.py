import pathlib

import pandas as pd


class get_tabd:

    def __init__(self, file):
        self.file = file

    def file_type(self):
        # 判断文件类型
        return pathlib.Path(self.file).suffix

    def get_data(self):
        filetype = self.file_type()
        if filetype in ['.xls', '.xlsx']:
            df = pd.read_excel(self.file)
        elif filetype in ['.csv']:
            df = pd.read_csv(self.file)
        return df.values.tolist()


