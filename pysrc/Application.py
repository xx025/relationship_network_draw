from flask_db_config import database


def get_my_data(email: str):
    conn = database.get_connection()
    c = conn.cursor()
    re = c.execute("select * FROM USER_FILE WHERE user = ?;", (email,))
    re = list(re)
    return re


def add_new_file(email: str, fpath: str, fname: str):
    """
    此方法
    """
    conn = database.get_connection()
    c = conn.cursor()
    c.execute("INSERT INTO USER_FILE (user,fpath,fname) VALUES (?,?,?);", (email, fpath, fname))
    conn.commit()
    conn.close()
    return True


def del_db_data(email: str, fpath: str):
    conn = database.get_connection()
    c = conn.cursor()
    c.execute("DELETE FROM USER_FILE WHERE user=? and fpath=?;", (email, fpath))
    conn.commit()
    conn.close()
    return "1"
