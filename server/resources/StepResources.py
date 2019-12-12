from flask_restful import Resource
from models.UserModel import UserModel
from models.StepModel import StepModel
from models.TaskModels import EmailTaskModel
from utils.RequestParserGenerator import RequestParserGenerator
from flask_jwt_extended import jwt_required, get_jwt_identity
from .GmailResources import get_stored_credentials
from utils.EmailHelper import send_emails
from utils.EmailHelper import Message

reqParserGen = RequestParserGenerator()
stepParser = reqParserGen.getParser('step_id')



class ExecuteStep(Resource):
    @jwt_required
    def post(self):
        """ Sending email using Gmail API"""
        data = stepParser.parse_args()
        user = UserModel.find_by_id(get_jwt_identity())
        step = StepModel.find_by_id(data['step_id'])
        campaign_id = step.campaign_id
        template = step.email_template
        credentials = get_stored_credentials(user.id)
        prospect_emails = [prospect.email for prospect in step.prospects]
        jobs = []
        for addr in prospect_emails:
            message = Message(
                to_address   = addr,
                from_address = user.gmail_address,
                subject      = template.subject,
                body         = template.body,
                credentials  = credentials
                campaign_id  = step.campaign_id,
                thread       = None
            )
            job = send_email(message)
            jobs.append(job)
        EmailTaskModel.add_jobs(jobs, user.id, prospect_emails, template.subject, template.body)
        return 200