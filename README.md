# 关系网可视化项目

- 后端：FLask
- 前端绘图：GraphVis
- 数据库：Sqlite


![](https://cdn.jsdelivr.net/gh/xx025/cloudimg@main/img/20220208104850.png)

---

### 背景

此项目作为本人本科毕业设计项目。很早之前我就想做出这样一个项目，但我很清楚的意识到这并不是件简单的事情。它不是简单的数据库读写，仅靠一种编程语言也很难完成。我知道Electron可以便捷的做出漂亮的桌面端但我也仅仅是知道，我觉着做成web程序相较于做成桌面端更容易一些。去做java或者python的桌面端程序很复杂，做的好看就更难了，然而仅仅写网页就简单很多，恰巧我之前有接触Flask，最近又找到了GraphVis，这也就前端后端各司其职，工具都有了开始就可以了。

开发工具我仍然用PyCharm，对Pycharm我己经用了很长时间了，VScode也不是不可以但前者更专业体验也更好，无论是Python还是html、JS、CSS
甚至包括数据库的可视化读写，PyCharm都能很好的处理。Python算是一种用系统算力弥补人工劳力的语言，它没有Java快或许还没有Java强大，但Python断臂似的不兼容老版本的更新策略也使得Python不断地快速的成长，整个Python系统就像一个哆啦A梦的口袋时不时就能掏出新玩意，也像一个怀着各种武艺不拘泥于过去的年轻人敢于舍弃种种累赘勇往直前，也相信未来Python会变得更好。我既不熟练html也不熟练css，但是js和python我还是稍稍熟悉一点点，这源于之前我写Greasfork脚本和用python做爬虫，而且他两个很像至少在处理分号问题上他们都不在乎；Sqlite数据库在之前的搜题应用种用过了；所以以上的只要不是涉及太难的技术点我放在阅读开发文档上一些时间也能很渐渐熟悉起来。

GraphVis的存在使得我不用再搞绘图的细节问题，只需把数据交给他就好了。我要做的是让绘图变成一个系统，可视化的添加、导入数据（python 库读写csv、xslx
），将GraphVis的需要的功能做成操作界面。既然做成了Web程序，我也不妨再把它布局到服务器上真正的做成一个网络应用程序，这也我也会考虑到多用户之类的处理。

---

### 知识库

#### 文档

- GraphVis开发文档：http://www.graphvis.cn/article/23
- Flask开发文档：https://dormousehole.readthedocs.io/en/latest/
- FlaskMail文档：http://www.pythondoc.com/flask-mail/
- Jinja2文档：http://www.ainoob.cn/docs/jinja2/index.html
- SQLite - Python：https://www.runoob.com/sqlite/sqlite-python.html
- jQuery 教程：https://www.runoob.com/jquery/jquery-tutorial.html
- CSS：https://www.runoob.com/css3/css3-tutorial.html
- Flask-Sqlite：http://www.pythondoc.com/flask/patterns/sqlite3.html
- Sqlite-Python：https://www.runoob.com/sqlite/sqlite-python.html

#### 技术参考

- 将flask拆分为多个py文件使用蓝图功能：https://blog.csdn.net/m0_37876745/article/details/95603397
- ~~yandex邮箱IMAP设置：https://zhuanlan.zhihu.com/p/338058178~~
- ~~Python SMTP发送邮件：https://www.runoob.com/python/python-email.html~~ 
- Flask-Mail的使用：https://blog.csdn.net/y472360651/article/details/77944869
- ~~Flask+Vue环境配置:https://www.bilibili.com/video/BV1Z54y1q7BZ~~
- Ajax实现文件上传：
  - https://www.jb51.net/article/121757.htm
  - https://blog.csdn.net/yehuaner33/article/details/108279727



----

#### 一些经验之谈

1. 电子邮箱选择问题，因为发送邮件验证码需要一个邮箱，需要选择一个注册配置简单的邮箱，我最初尝试使用国外的yandex邮箱同时发送邮件的服务还是使用Python SMTP这样搭配下来速度很慢，经过一段时间我竟然还忘记了yandex邮箱的密保问题，在尝试163和QQ邮箱之后我最终选择了阿里邮箱（注册需要用手机号），但是阿里邮箱配置stmp很简单不用复杂的验证;
2. flask 邮件发送服务问题，Python SMTP当然也可以，但是既然有更舒适的flask_mail使用选择flask_mail是最好的了。之前曾在交流群里看到说使用flask_mail循环导包问题，我其实没花太多功夫就解决了这个问题算是没有遇到，简答来说就是将不同的服务（方法或者说配置）拆分为更小的块，让他足够独立，可参考我的写法flask_app和flask_mail 是两个不同的模块运行程序Run.py也独立出来;
3. IDE问题，pycharm社区版可以用但绝对没有专业版方便，尤其是构建web程序专业版就是开箱即用。但是专业版要么是破解版要么是试用版或者正版（RMB用户或学生优惠、优秀开发者），因为使用了一些时间，最初是得到了一个学生邮箱但是一年后就到期了学生邮箱也失效了，我尝试使用破解版或者试用版很讨厌，所以我又花时间用‘官方文件’申请教育优惠，申请了三次最后是通过了，使用的文件是”《教育部学籍在线验证报告》“和成绩单。
4. 处理一些问题的态度，有时候解决一个问题会花费很多功夫产生很多代码但是却没有弄好，如果是这样最好是试试能不能用其他方法忍下心来将那些似懂非懂难于运行的代码删掉，静下心来歇息一下寻求帮助看看是否可以尝试用一种新的方法。我在处理邮件问题的时候就出现了这种情况。







