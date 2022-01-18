

# 关系网可视化项目



- 后端：FLask
- 前端绘图：GraphVis
- 数据库：Sqlite

<center>

![](https://cdn.jsdelivr.net/gh/xx025/cloudimg@main/img/20220118131927.png)

</center>


---

### 背景

此项目作为本人本科毕业设计项目。很早之前我就想做出这样一个项目，但我很清楚的意识到这并不是件简单的事情。它不是简单的数据库读写，仅靠一种编程语言也很难完成。我知道Electron可以便捷的做出漂亮的桌面端但我也仅仅是知道，我觉着做成web程序相较于做成桌面端更容易一些。去做java或者python的桌面端程序很复杂，做的好看就更难了，然而仅仅写网页就简单很多，恰巧我之前有接触Flask，最近又找到了GraphVis，这也就前端后端各司其职，工具都有了开始就可以了。

开发工具我仍然用PyCharm，对Pycharm我己经用了很长时间了，VScode也不是不可以但前者更专业体验也更好，无论是Python还是html、JS、CSS 甚至包括数据库的可视化读写，PyCharm都能很好的处理。Python算是一种用系统算力弥补人工劳力的语言，它没有Java快或许还没有Java强大，但Python断臂似的不兼容老版本的更新策略也使得Python不断地快速的成长，整个Python系统就像一个哆啦A梦的口袋时不时就能掏出新玩意，也像一个怀着各种武艺不拘泥于过去的年轻人敢于舍弃种种累赘勇往直前，也相信未来Python会变得更好。我既不熟练html也不熟练css，但是js和python我还是稍稍熟悉一点点，这源于之前我写Greasfork脚本和用python做爬虫，而且他两个很像至少在处理分号问题上他们都不在乎；Sqlite数据库在之前的搜题应用种用过了；所以以上的只要不是涉及太难的技术点我放在阅读开发文档上一些时间也能很渐渐熟悉起来。

GraphVis的存在使得我不用再搞绘图的细节问题，只需把数据交给他就好了。我要做的是让绘图变成一个系统，可视化的添加、导入数据（python 库读写csv、xslx ），将GraphVis的需要的功能做成操作界面。既然做成了Web程序，我也不妨再把它布局到服务器上真正的做成一个网络应用程序，这也我也会考虑到多用户之类的处理。

---

### 知识库

- GraphVis开发文档：http://www.graphvis.cn/article/23
- Flask开放文档：https://dormousehole.readthedocs.io/en/latest/
- SQLite - Python：https://www.runoob.com/sqlite/sqlite-python.html
- jQuery 教程：https://www.runoob.com/jquery/jquery-tutorial.html
- CSS：https://www.runoob.com/css3/css3-tutorial.html

