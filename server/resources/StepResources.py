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

reqParserGen = RequestParserGenerator()
stepParser = reqParserGen.getParser('step_id')



class ExecuteStep(Resource):
    @jwt_required
    def post(self):
        """ Sending email using Gmail API"""
        data = stepParser.parse_args()
        user = UserModel.find_by_id(get_jwt_identity())
        step = StepModel.find_by_id(data['step_id'])
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