from flask_app import app
from models.py_methods import init_project
from routes.Account import user
from routes.Applaction import draw_app

app.register_blueprint(draw_app)
app.register_blueprint(user)

init_project()

if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=80, debug=True)
    app.run(host='0.0.0.0', port=80)
