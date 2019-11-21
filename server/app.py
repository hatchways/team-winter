from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

from api.ping_handler import ping_handler
from api.home_handler import home_handler

app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config')
app.config.from_pyfile('config.py')

api = Api(app)
db = SQLAlchemy(app) 
jwt = JWTManager(app)

from models import UserModel, ProspectModel, TagModel
from resources import UserResources

api.add_resource(UserResources.UserRegister, '/register')
api.add_resource(UserResources.UserLogin, '/login')
api.add_resource(UserResources.UserTest, '/test')

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

