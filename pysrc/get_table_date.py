import copy
import pathlib

import pandas as pd


class get_tabd:

    def __init__(self, file_path):
        self.file = file_path

    def __file_type(self):
        # 判断文件类型
        return pathlib.Path(self.file).suffix

    def get_data(self):
        """
        注意：header=None
        :return: 返回二维数据表格中的数据
        """
        global df
        filetype = self.__file_type()
        if filetype in ['.xls', '.xlsx']:
            df = pd.read_excel(self.file)
        elif filetype in ['.csv']:
            df = pd.read_csv(self.file)
        return df.values.tolist()


class convert_graph_data:
    def __init__(self, file_path: list):
        self.data = get_tabd(file_path=file_path).get_data()
        self.__nodes = self.__get_nodes()
        self.__nodes_n = len(self.__nodes)
        self.__nodes_dict = self.__get_nodes_dict()

    def __get_nodes(self):
        nodes = set()
        for i in self.data:
            nodes.add(i[0])
            nodes.add(i[1])
        else:
            return list(nodes)

    def __get_nodes_dict(self):

        nodes_details = dict()
        for i in range(self.__nodes_n):
            nodes_details[self.__nodes[i]] = str(i + 1)
        else:
            """
                   key :label
                   val : id
                   example return :
                   {'刘备': '1', '关羽': '2', '张飞': '3', '曹操': '4'}
            """
            return nodes_details

    def get_gv_nodes(self):
        gv_nodes = []
        gv_node = {'id': '1', 'label': 'name', 'type': 'null', 'x': 100,
                   'y': 100, 'properties': {}}
        for i, j in self.__nodes_dict.items():
            gv_node['id'] = j
            gv_node['label'] = i

            # 将节点位置增1
            gv_node['x'] = gv_node['x'] + 1
            gv_node['y'] = gv_node['y'] + 1

            """
            注意,此处使用了cpoy;如果只是引用将只是返回四个相同的对象
            """
            gv_nodes.append(copy.copy(gv_node))
        else:
            return gv_nodes

    def get_gv_links(self):
        gv_links = []
        gv_link = {"source": "1", "target": "2", "lable": "关系",
                   "properties": {}}

        for i in self.data:
            gv_link["source"] = self.__nodes_dict[i[0]]
            gv_link["target"] = self.__nodes_dict[i[1]]
            gv_link["label"] = i[2]
            gv_links.append(copy.copy(gv_link))
        else:
            return gv_links

    def get_gv_data(self):
        return {"nodes": self.get_gv_nodes(), "links": self.get_gv_links()}
