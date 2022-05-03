from flask_app import app
from flask_db import database

from routes.Account import user
from routes.Applaction import draw_app

app.register_blueprint(draw_app)
app.register_blueprint(user)

database.init_db()
# 初始化数据库

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
