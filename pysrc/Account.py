from flask_db_config import database


def add_new_user(email, password):
    conn = database.get_connection()
    c = conn.cursor()
    if len(list(c.execute("SELECT * FROM USER WHERE email =?", (email,)))) == 0:
        c.execute("INSERT INTO user (email,password) VALUES (?,?);", (email, password))
        conn.commit()
        conn.close()
        return True, "添加成功"
    else:
        return False, "账号已存在"


def query_user(self, email):
    conn = database.get_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM USER WHENEVER EMAIL=?", email)
