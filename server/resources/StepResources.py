from flask_restful import Resource
from models.UserModel import UserModel
from models.StepModel import StepModel
from models.CampaignModel import CampaignModel
from models.ProspectModel import ProspectModel
from models.EmailTemplateModel import EmailTemplateModel
from utils.RequestParserGenerator import RequestParserGenerator
from flask_jwt_extended import jwt_required, get_jwt_identity
from .GmailResources import get_stored_credentials

import os
import base64
import httplib2
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from apiclient.discovery import build
from apiclient import errors

reqParserGen = RequestParserGenerator()
stepParser = reqParserGen.getParser('step_id')

def create_message(sender, to, subject, message_text):
    """Create a message for an email.

    Args:
        sender: Email address of the sender.
        to: Email address of the receiver.
        subject: The subject of the email message.
        message_text: The text of the email message.

    Returns:
        An object containing a base64url encoded email object.
    """
    message = MIMEText(message_text)
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    encoded_message= base64.urlsafe_b64encode(message.as_bytes())
    return {'raw' : encoded_message.decode()}

def send_message(service, user_id, message):
    """Send an email message.

    Args:
        service: Authorized Gmail API service instance.
        user_id: User's email address. The special value "me"
        can be used to indicate the authenticated user.
        message: Message to be sent.

    Returns:
        Sent Message.
    """
    try:
        message = (service.users().messages().send(userId=user_id, body=message)
               .execute())
        print('Message Id: %s' % message['id'])
        return message
    except(errors.HttpError, errors.Error):
        print('An error occurred: %s' % error)

def get_gmail_service(credentials):
    """Build a Gmail service object.

    Args:
        credentials: OAuth 2.0 credentials.

    Returns:
        Gmail service object.
    """
    return build(
        'gmail', 'v1', 
        http=credentials.authorize(http = httplib2.Http())
    )

class ExecuteStep(Resource):
    @jwt_required
    def post(self):
        """ Sending email using Gmail API"""
        data = stepParser.parse_args()
        user = UserModel.find_by_id(get_jwt_identity())
        step = StepModel.find_by_id(data['step_id'])
        email_template = step.email_template
        message = create_message(
            user.gmail_address,
            'fovimo2502@mailhub.pro', # temporary email
            email_template.subject,
            email_template.body
        )
        print(message)
        sent_message = send_message(
            get_gmail_service(get_stored_credentials(user.id)),
            "me",
            message
        )
        print(sent_message)
        return 200