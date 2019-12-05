from flask_restful import Resource
from models.StepModel import StepModel
from models.CampaignModel import CampaignModel
from models.ProspectModel import ProspectModel
from models.EmailTemplateModel import EmailTemplateModel
from utils.RequestParserGenerator import RequestParserGenerator
from flask_jwt_extended import jwt_required, get_jwt_identity


class EmailTemplates(Resource):
    @jwt_required
    def get(self):
        email_templates = EmailTemplateModel.get_all_templates()
        try:
            return {
                'email_templates': [
                    template.to_dict(rules=('-steps.email_template', '-steps.campaign'))
                    for template in email_templates
                ]
            }, 200
        except:
            return {'message': 'Something went wrong'}, 500 