from flask import Blueprint

user = Blueprint('user', __name__)


@user.route('/register', methods=['post', 'get'])
def register():
    return '1'


@user.route('/login', methods=['post', 'get'])
def login():
    return '1'
