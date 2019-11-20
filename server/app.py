from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

from api.home_handler import home_handler
from api.ping_handler import ping_handler


app = Flask(__name__, instance_relative_config=True)
api = Api(app)

app.config.from_object('config.default')

app.config.from_pyfile('config.py')

api = Api(app)
db = SQLAlchemy(app) 
jwt = JWTManager(app)

from resources import UserResources, GmailResources

api.add_resource(UserResources.UserRegister, '/register')
api.add_resource(UserResources.UserLogin, '/login')
api.add_resource(GmailResources.GetAuthURL, '/gmail/get_auth_url')
api.add_resource(GmailResources.Authorize, '/gmail/authorize')

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)