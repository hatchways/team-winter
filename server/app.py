from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS


from api.home_handler import home_handler


app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config.default')
app.config.from_pyfile('config.py')

CORS(app)
api = Api(app)
db = SQLAlchemy(app) 
jwt = JWTManager(app)  


from models import (
    UserModel, 
    ProspectModel,
    TagModel, 
    CampaignModel, 
    StepModel, 
    TemplateModel,
    ThreadModel,
    EmailTaskModel,
    ThreadTaskModel
)
from resources import (
    UserResources, 
    GmailResources, 
    CampaignResources, 
    ProspectsResources,
    TemplateResources,
    StepResources,
    ThreadResources
)


@app.before_first_request
def restart_incomplete_tasks():
    EmailTaskModel.EmailTaskModel.restart_all_incomplete()


api.add_resource(UserResources.UserRegister, '/register')
api.add_resource(UserResources.UserLogin, '/login')
api.add_resource(UserResources.UserProspects, '/prospects')
api.add_resource(TemplateResources.Templates, '/templates', endpoint='templates')
api.add_resource(TemplateResources.TemplatesById, '/templates/<int:id>', endpoint='template')
api.add_resource(UserResources.UserCampaigns, '/campaigns')
api.add_resource(GmailResources.GetAuthURL, '/gmail/get_auth_url')
api.add_resource(GmailResources.Authorize, '/gmail/authorize')
api.add_resource(GmailResources.GetGmailAddress, '/gmail/get_address')
api.add_resource(ProspectsResources.UploadProspects, '/prospects/upload')
api.add_resource(ProspectsResources.InheritPreviousStepProspects, '/steps/prospects')
api.add_resource(CampaignResources.GetCampaign, '/campaigns/<int:id>')
api.add_resource(CampaignResources.CampaignProspects, '/campaign/<int:id>/prospects')
api.add_resource(CampaignResources.CreateStepToCampaign, '/campaign/<int:id>/steps')
api.add_resource(CampaignResources.CampaignSent, '/campaign/<int:id>/sent')
api.add_resource(CampaignResources.CampaignReplies, '/campaign/<int:id>/replied')
api.add_resource(StepResources.ExecuteStep, '/steps/<int:id>/send')
api.add_resource(StepResources.Sent, '/steps/<int:id>/sent')
api.add_resource(StepResources.Step, '/campaigns/<int:id>/steps', endpoint='steps')
api.add_resource(StepResources.Step, '/steps/<int:id>', endpoint='step')
api.add_resource(ThreadResources.Update, '/threads/update')
api.add_resource(ThreadResources.Status, '/threads/status')


app.register_blueprint(home_handler)