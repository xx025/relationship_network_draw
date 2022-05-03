import sqlite3
from contextlib import closing

from flask import g

from flask_app import app
from flask_config import setting


class database:
    @staticmethod
    def get_connection():
        db = getattr(g, '_db', None)
        if db is None:
            db = g._db = sqlite3.connect(database=setting.sqlite_db_path)
        return db

    @staticmethod
    def close_db():
        db = g.pop('_db', None)
        if db is not None:
            db.close()

    @staticmethod
    def init_db():
        with closing(sqlite3.connect(database=setting.sqlite_db_path)) as db:
            with app.open_resource('init.sql') as f:
                db.cursor().executescript(f.read().decode())
                db.commit()
