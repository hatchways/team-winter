from flask_restful import Resource
from models.UserModel import UserModel
from models.StepModel import StepModel
from models.EmailTemplateModel import EmailTemplateModel
from models.CampaignModel import CampaignModel
from utils.RequestParserGenerator import RequestParserGenerator
from flask_jwt_extended import jwt_required, get_jwt_identity
from .GmailResources import get_stored_credentials
from utils.EmailSender import send_emails
from utils.MessageConverter import convertAllMessages

reqParserGen = RequestParserGenerator()
execute_parser = reqParserGen.getParser('step_id')
create_parser = reqParserGen.getParser('template_id')
update_parser = reqParserGen.getParser('template_id')

class Step(Resource):
    @jwt_required 
    def post(self, id):
        data = create_parser.parse_args()
        campaign = CampaignModel.find_by_id(id)
        template_id = data['template_id']
        template = EmailTemplateModel.find_by_id(template_id)
        if template.owner_id != get_jwt_identity():
            return {'message': 'You don\'t have permission to do that.'}, 403
        if not campaign:
            return {'message': 'Campaign {} doesn\'t exist'.format(id)}, 400
        if campaign.owner_id != get_jwt_identity():
            return {'message': 'You don\'t have permission to do that.'}, 403
        new_step = StepModel(
            campaign_id = id,
            email_template_id = template_id 
        )
        try:
            new_step.save_to_db()
            return {
                'step' : new_step.to_dict(rules = 
                    ('-email_template.steps', '-email_template.owner', '-prospects.campaigns',
                    '-prospects.tags', '-prospects.steps', '-campaign'))
            }, 201
        except:
            return {'message': 'Something went wrong'}, 500

    @jwt_required
    def put(self, id):
        """Update a step"""
        data = update_parser.parse_args()
        new_template_id = data['template_id']
        step = StepModel.find_by_id(id)
        if step.campaign.owner_id != get_jwt_identity():
            return {
                'message': 'You don\'t own that step'
            }, 401
        template = EmailTemplateModel.find_by_id(new_template_id)
        if template.owner_id != get_jwt_identity():
            return {'message': 'You don\'t have permission to do that.'}, 403
        step.email_template_id = template.id
        step.update()
        return {
            'step': step.to_dict(rules = 
                    ('-email_template.steps', '-email_template.owner', '-prospects.campaigns',
                    '-prospects.tags', '-prospects.steps', '-campaign'))
        }, 200

    @jwt_required
    def delete(self, id):
        """Delete a step"""
        current_user = UserModel.find_by_id(get_jwt_identity())
        step = StepModel.find_by_id(id)
        if step.campaign.owner_id != current_user.id:
            return {
                'message': 'You don\'t own that step'
            }, 401
        step.delete()
        return {
            'message': f'Step {id} deleted'
        }, 200


class ExecuteStep(Resource):
    @jwt_required
    def post(self):
        """ Sending email using Gmail API"""
        data = stepParser.parse_args()
        user = UserModel.find_by_id(get_jwt_identity())
        step = StepModel.find_by_id(data['step_id'])
        template = step.template
        credentials = get_stored_credentials(user.id)
        prospects = convertAllMessages(user, step.prospects, template)
        send_emails(user.gmail_address, prospects, template.subject, credentials)
        return 200