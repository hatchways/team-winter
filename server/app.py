from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS


from api.home_handler import home_handler


app = Flask(__name__, instance_relative_config=True)
CORS(app)
api = Api(app)

app.config.from_object('config.default')

app.config.from_pyfile('config.py')

api = Api(app)
db = SQLAlchemy(app) 
jwt = JWTManager(app)

from resources import UserResources, GmailResources, ProspectsResources
from models import UserModel, ProspectModel, TagModel

api.add_resource(UserResources.UserRegister, '/register')
api.add_resource(UserResources.UserLogin, '/login')
api.add_resource(GmailResources.GetAuthURL, '/gmail/get_auth_url')
api.add_resource(GmailResources.Authorize, '/gmail/authorize')
api.add_resource(GmailResources.GetGmailAddress, '/gmail/get_address')
api.add_resource(ProspectsResources.UploadProspects, '/prospects/upload')

app.register_blueprint(home_handler)