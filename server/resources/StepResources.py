from flask_restful import Resource
from models.UserModel import UserModel
from models.StepModel import StepModel
from models.EmailTaskModel import EmailTaskModel
from utils.RequestParserGenerator import RequestParserGenerator
from flask_jwt_extended import jwt_required, get_jwt_identity
from .GmailResources import get_stored_credentials
from utils.EmailSender import (
    send_email,
    Message
)
from utils.MessageConverter import replaceVariables
from models.TemplateModel import TemplateModel
from models.CampaignModel import CampaignModel

reqParserGen = RequestParserGenerator()
execute_parser = reqParserGen.getParser('step_id')
create_parser = reqParserGen.getParser('template_id')
update_parser = reqParserGen.getParser('template_id')
step_parser = reqParserGen.getParser('step_id')

class Step(Resource):
    @jwt_required 
    def post(self, id):
        data = create_parser.parse_args()
        campaign = CampaignModel.find_by_id(id)
        template_id = data['template_id']
        template = TemplateModel.find_by_id(template_id)
        if template.owner_id != get_jwt_identity():
            return {'message': 'You don\'t have permission to do that.'}, 403
        if not campaign:
            return {'message': 'Campaign {} doesn\'t exist'.format(id)}, 400
        if campaign.owner_id != get_jwt_identity():
            return {'message': 'You don\'t have permission to do that.'}, 403
        new_step = StepModel(
            campaign_id = id,
            template_id = template_id 
        )
        try:
            new_step.save_to_db()
            return {
                'step' : new_step.to_dict(rules = 
                    ('-template.steps', '-template.owner', '-prospects.campaigns', '-email_tasks',
                    '-prospects.tags', '-prospects.steps', '-prospects.owner', '-campaign', '-email_tasks'))
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
        template = TemplateModel.find_by_id(new_template_id)
        if template.owner_id != get_jwt_identity():
            return {'message': 'You don\'t have permission to do that.'}, 403
        step.template_id = template.id
        step.template = template
        step.update()
        return {
            'step': step.to_dict(rules = 
                    ('-template.steps', '-template.owner', '-prospects.campaigns', '-email_tasks',
                    '-prospects.tags', '-prospects.steps', '-prospects.owner', '-campaign', '-email_tasks'))
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
    def post(self, id):
        """Sending email using Gmail API"""
        user = UserModel.find_by_id(get_jwt_identity())
        step = StepModel.find_by_id(id)
        if step.campaign.owner.id != user.id:
            return {
                'message': 'you can\'t execute that step'
            }, 401
        campaign_id = step.campaign_id
        body = step.template.body
        credentials = get_stored_credentials(user.id)
        jobs = []
        for p in step.prospects:
            message = Message(
                to_address   = p.email,
                from_address = user.gmail_address,
                subject      = step.template.subject,
                body         = replaceVariables(user, p, body),
                credentials  = credentials,
                campaign_id  = step.campaign_id,
                user_id      = user.id,
                thread_id    = None
            )
            job = send_email(message)
            jobs.append(job)
        prospect_emails = [ p.email for p in step.prospects ]
        EmailTaskModel.add_jobs(
            jobs            = jobs,
            user_id         = user.id,
            step_id         = step.id, 
            prospect_emails = prospect_emails, 
            subject         = step.template.subject,
            body            = step.template.body)
        return 200


class Sent(Resource):
    @jwt_required
    def get(self, id):
        """Return the number of emails sent in this step"""
        user_id = get_jwt_identity()
        step = StepModel.find_by_id(id)
        if step.campaign.owner.id != user_id:
            return {
                'message': 'you don\'t own that step'
            }, 401
        num_sent = EmailTaskModel.count_sent_in_step(step.id)
        return {
            'sent': num_sent
        }, 200
