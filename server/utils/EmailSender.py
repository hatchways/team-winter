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

    

def create_and_send_message(sender, to, subject, message_text, credentials):
    message = MIMEText(message_text)
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    encoded_message= base64.urlsafe_b64encode(message.as_bytes())
    raw_msg =  {'raw' : encoded_message.decode()}

    service = build(
        'gmail', 'v1', 
        http=credentials.authorize(http = httplib2.Http())
    )

    try:
        message = service.users().messages().send(userId='me', body=raw_msg).execute()
        print('Message Id: %s' % message['id'])
        return message
    except (errors.HttpError, errors.Error) as e:
        print('An error occurred: %s' % e)


def send_emails(sender, prospects, subject, credentials):
    with redis.from_url(REDIS_URL) as conn:
        q = Queue('task', connection=conn)
        q.enqueue(
            enqueue_message,
            sender,
            prospects,
            subject,
            credentials
        )

def enqueue_message(sender, prospects, subject, credentials):
    with redis.from_url(REDIS_URL) as conn:
        q = Queue('emails', connection=conn)
        for prospect in prospects:
            q.enqueue(
                create_and_send_message,
                sender,
                prospect['email'],
                subject,
                prospect['message'],
                credentials
            )
    return 200