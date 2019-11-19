from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

from api.ping_handler import ping_handler
from api.home_handler import home_handler

from config import DATABASE_URL, JWT_SECRET_KEY, SECRET_KEY

app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['SECRET_KEY'] = SECRET_KEY

db = SQLAlchemy(app) 
jwt = JWTManager(app)

from models import UserModel
from resources import UserResources

api.add_resource(UserResources.UserRegister, '/register')
api.add_resource(UserResources.UserLogin, '/login')

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

