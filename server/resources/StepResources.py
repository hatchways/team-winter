from flask_restful import Resource
from models.StepModel import StepModel
from models.CampaignModel import CampaignModel
from models.ProspectModel import ProspectModel
from models.EmailTemplateModel import EmailTemplateModel
from utils.RequestParserGenerator import RequestParserGenerator
from flask_jwt_extended import jwt_required, get_jwt_identity

class ExecuteStep(Resource):
    def post(self):
        # Handle executing the step and sending email

        return 200