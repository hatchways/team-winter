import os
import base64
import httplib2
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from apiclient.discovery import build
from apiclient import errors
from rq import Queue
from config.default import REDIS_URL
import redis
from time import sleep

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

def send_message(credentials, message):
    """Send an email message"""
    service = build(
        'gmail', 'v1', 
        http=credentials.authorize(http = httplib2.Http())
    )
    try:
        print("going to sleep")
        sleep(5)
        print("waking to send a message")
        message = service.users().messages().send(userId='me', body=message).execute()
        print('Message Id: %s' % message['id'])
        return message
    except (errors.HttpError, errors.Error) as e:
        print('An error occurred: %s' % e)

def enqueue_message(from_address, to_address, subject, body, credentials):
    message = create_message(
        from_address,
        to_address, 
        subject,
        body
    )
    with redis.from_url(REDIS_URL) as conn:
        q = Queue('flask-task', connection=conn)
        q.enqueue(
            send_message,
            credentials, 
            message
        )
    return 200