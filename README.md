# 关系网可视化项目

- 后端：FLask
- 前端绘图：GraphVis
- 数据库：Sqlite

![](https://cdn.jsdelivr.net/gh/xx025/cloudimg@main/img/20220208104850.png)

![](https://cdn.jsdelivr.net/gh/xx025/cloudimg/img/20220427213240.png)

![](https://cdn.jsdelivr.net/gh/xx025/cloudimg/img/20220427213444.png)

---

# 数据库设计

- 第一张表存储用户名和密码(sha256)，
- 第二张表存储用户上传的文件路径(时间戳重命名)和源文件名

### 创建用户表

```sqlite
drop table if exists USER;
create table USER
(
    email    text PRIMARY KEY,
    password text
);

```

### 创建用户文件关联表

```sqlite
drop table if exists USER_FILE;
Create table USER_FILE
(
    user  text,
    fpath text primary key,
    fname text,
    constraint user_key foreign key (user) references USER (email)
);
```

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
- Python-Magic 区分文件类型:https://pypi.org/project/python-magic/
- demjson json文件的处理:https://github.com/dmeranda/demjson

#### 技术参考

- 将flask拆分为多个py文件使用蓝图功能：
    - https://blog.csdn.net/m0_37876745/article/details/95603397

- ~~yandex邮箱IMAP设置：https://zhuanlan.zhihu.com/p/338058178~~
- ~~Python SMTP发送邮件：https://www.runoob.com/python/python-email.html~~
- Flask-Mail的使用：https://blog.csdn.net/y472360651/article/details/77944869
- ~~Flask+Vue环境配置:https://www.bilibili.com/video/BV1Z54y1q7BZ~~
- Ajax实现文件上传：
    - https://www.jb51.net/article/121757.htm
    - https://blog.csdn.net/yehuaner33/article/details/108279727
- flask 上传文件（一些细节）
    - https://www.csdn.net/tags/Ntjakg4sNjg3MDktYmxvZwO0O0OO0O0O.html

----

#### 一些经验之谈

1. 电子邮箱选择问题，因为发送邮件验证码需要一个邮箱，需要选择一个注册配置简单的邮箱，我最初尝试使用国外的yandex邮箱同时发送邮件的服务还是使用PythonSMTP这样搭配下来速度很慢，经过一段时间我竟然还忘记了yandex邮箱的密保问题，在尝试163和QQ邮箱之后我最终选择了阿里邮箱（注册需要用手机号），但是阿里邮箱配置stmp很简单不用复杂的验证;
2. flask 邮件发送服务问题，Python
   SMTP当然也可以，但是既然有更舒适的flask_mail使用选择flask_mail是最好的了。之前曾在交流群里看到说使用flask_mail循环导包问题，我其实没花太多功夫就解决了这个问题算是没有遇到，简答来说就是将不同的服务（方法或者说配置）拆分为更小的块，让他足够独立，可参考我的写法flask_app和flask_mail是两个不同的模块运行程序Run.py也独立出来;
3.

IDE问题，pycharm社区版可以用但绝对没有专业版方便，尤其是构建web程序专业版就是开箱即用。但是专业版要么是破解版要么是试用版或者正版（RMB用户或学生优惠、优秀开发者），因为使用了一些时间，最初是得到了一个学生邮箱但是一年后就到期了学生邮箱也失效了，我尝试使用破解版或者试用版很讨厌，所以我又花时间用‘官方文件’申请教育优惠，申请了三次最后是通过了，使用的文件是”《教育部学籍在线验证报告》“和成绩单。

4. 处理一些问题的态度，有时候解决一个问题会花费很多功夫产生很多代码但是却没有弄好，如果是这样最好是试试能不能用其他方法忍下心来将那些似懂非懂难于运行的代码删掉，静下心来歇息一下寻求帮助看看是否可以尝试用一种新的方法。我在处理邮件问题的时候就出现了这种情况。







