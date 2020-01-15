from flask import Flask, send_from_directory, jsonify, request
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS
import os

app = Flask(
    __name__, 
    static_folder='client/build',
    instance_relative_config=True
)
app.config.from_object('config.default')
app.config.from_pyfile('config.py', silent=True)

if os.getenv('FLASK_ENV') == 'development':
    CORS(app) 
api = Api(app)
db = SQLAlchemy(app) 
jwt = JWTManager(app)  


@app.route("/")
def serve():
    """serves React App"""
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:path>")
def static_proxy(path):
    """static folder serve"""
    file_name = path.split("/")[-1]
    dir_name = os.path.join(app.static_folder, "/".join(path.split("/")[:-1]))
    return send_from_directory(dir_name, file_name)


@app.errorhandler(404)
def handle_404(e):
    if request.path.startswith("/api/"):
        return jsonify(message="Resource not found"), 404
    return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(405)
def handle_405(e):
    if request.path.startswith("/api/"):
        return jsonify(message="Mehtod not allowed"), 405
    return e


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
    db.create_all()
    # EmailTaskModel.EmailTaskModel.restart_all_incomplete()


api.add_resource(UserResources.UserRegister, '/api/register')
api.add_resource(UserResources.UserLogin, '/api/login')
api.add_resource(UserResources.User, '/api/user')
api.add_resource(UserResources.UserProspects, '/api/prospects')
api.add_resource(TemplateResources.Templates, '/api/templates', endpoint='templates')
api.add_resource(TemplateResources.TemplatesById, '/api/templates/<int:id>', endpoint='template')
api.add_resource(UserResources.UserCampaigns, '/api/campaigns')
api.add_resource(GmailResources.GetAuthURL, '/api/gmail/get_auth_url')
api.add_resource(GmailResources.Authorize, '/api/gmail/authorize')
api.add_resource(GmailResources.GetGmailAddress, '/api/gmail/get_address')
api.add_resource(ProspectsResources.UploadProspects, '/api/prospects/upload')
api.add_resource(ProspectsResources.InheritPreviousStepProspects, '/api/steps/prospects')
api.add_resource(CampaignResources.GetCampaign, '/api/campaigns/<int:id>')
api.add_resource(CampaignResources.CampaignProspects, '/api/campaign/<int:id>/prospects')
api.add_resource(CampaignResources.CreateStepToCampaign, '/api/campaign/<int:id>/steps')
api.add_resource(CampaignResources.CampaignSent, '/api/campaign/<int:id>/sent')
api.add_resource(CampaignResources.CampaignReplies, '/api/campaign/<int:id>/replied')
api.add_resource(StepResources.ExecuteStep, '/api/steps/<int:id>/send')
api.add_resource(StepResources.Sent, '/api/steps/<int:id>/sent')
api.add_resource(StepResources.Step, '/api/campaigns/<int:id>/steps', endpoint='steps')
api.add_resource(StepResources.Step, '/api/steps/<int:id>', endpoint='step')
api.add_resource(ThreadResources.Update, '/api/threads/update')
api.add_resource(ThreadResources.Status, '/api/threads/status')
