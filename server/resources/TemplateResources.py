from flask_restful import Resource
from models.StepModel import StepModel
from models.CampaignModel import CampaignModel
from models.ProspectModel import ProspectModel
from models.EmailTemplateModel import EmailTemplateModel
from utils.RequestParserGenerator import RequestParserGenerator
from flask_jwt_extended import jwt_required, get_jwt_identity
# ('-email_template.steps', '-email_template.owner', '-prospects.campaigns',
#                     '-prospects.tags', '-prospects.steps', '-campaign'))

class EmailTemplates(Resource):
    @jwt_required
    def get(self):
        email_templates = EmailTemplateModel.get_templates_by_owner_id(get_jwt_identity())
        try:
            return {
                'email_templates': [
                    template.to_dict(rules=('-steps.email_template', '-steps.campaign', '-owner',
                                            '-steps.prospects'))
                    for template in email_templates
                ]
            }, 200
        except:
            return {'message': 'Something went wrong'}, 500 