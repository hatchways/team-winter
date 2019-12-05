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


from models import (
    UserModel, 
    ProspectModel,
    TagModel, 
    CampaignModel, 
    StepModel, 
    EmailTemplateModel
)
from resources import (
    UserResources, 
    GmailResources, 
    CampaignResources, 
    ProspectsResources,
    TemplateResources
)



api.add_resource(UserResources.UserRegister, '/register')
api.add_resource(UserResources.UserLogin, '/login')
api.add_resource(UserResources.UserProspects, '/prospects')
api.add_resource(TemplateResources.AllTemplates, '/templates/all')
api.add_resource(TemplateResources.OneTemplate, '/templates')
api.add_resource(UserResources.UserCampaigns, '/campaigns')
api.add_resource(GmailResources.GetAuthURL, '/gmail/get_auth_url')
api.add_resource(GmailResources.Authorize, '/gmail/authorize')
api.add_resource(GmailResources.GetGmailAddress, '/gmail/get_address')
api.add_resource(ProspectsResources.UploadProspects, '/prospects/upload')
api.add_resource(CampaignResources.CampaignProspects, '/campaign/<int:id>/prospects')
api.add_resource(CampaignResources.CreateStepToCampaign, '/campaign/<int:id>/steps')

app.register_blueprint(home_handler)