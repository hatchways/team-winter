from flask_restful import Resource
from models.UserModel import UserModel
from models.StepModel import StepModel
from utils.RequestParserGenerator import RequestParserGenerator
from flask_jwt_extended import jwt_required, get_jwt_identity
from .GmailResources import get_stored_credentials
from utils.EmailHelper import send_emails

reqParserGen = RequestParserGenerator()
stepParser = reqParserGen.getParser('step_id')



class ExecuteStep(Resource):
    @jwt_required
    def post(self):
        """ Sending email using Gmail API"""
        data = stepParser.parse_args()
        user = UserModel.find_by_id(get_jwt_identity())
        step = StepModel.find_by_id(data['step_id'])
        template = step.template
        credentials = get_stored_credentials(user.id)
        prospect_emails = [prospect.email for prospect in step.prospects]
        send_emails(user.gmail_address, prospect_emails, template.subject, template.body, credentials)
        return 200