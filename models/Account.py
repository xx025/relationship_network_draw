from flask_db import database


def check_user_email(email: str) -> bool:
    """
    此方法，向数据库检查邮箱是否存在于数据库中
    """
    conn = database.get_connection()
    c = conn.cursor()
    re = c.execute("SELECT * FROM USER WHERE EMAIL=?", (email,))
    re = list(re)
    '''
    re是查询的结果列表，
    如果邮箱存在于数据库则 len(re)=1>0
        return true,
    否则
        return false
    '''
    return len(re) > 0


def add_new_user(email: str, password: str) -> None:
    """
    此方法，向数据库插入一个新用户的邮箱和密码（sha256）
    在此方法内不校验email是否已经存在于数据库，
    在使用此方法前首相要用check_user_mail()检查email
    """
    conn = database.get_connection()
    c = conn.cursor()
    c.execute("INSERT INTO user (email,password) VALUES (?,?);", (email, password))
    conn.commit()
    conn.close()


def check_user_pass(email: str, password: str) -> bool:
    conn = database.get_connection()
    c = conn.cursor()
    re = c.execute("SELECT  password FROM USER WHERE email=? ;", (email,))
    re = list(re)
    return password == re[0][0]


def update_user_pass(email: str, new_pass: str) -> None:
    conn = database.get_connection()
    c = conn.cursor()
    c.execute("UPDATE USER SET password=? where email=?", (new_pass, email))
    conn.commit()
    conn.close()
