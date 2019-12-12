import os
import base64
import httplib2
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from apiclient.discovery import build
from apiclient import errors
from rq import (
    Queue,
    get_current_job
)
from config.default import (
    REDIS_URL,
    DATABASE_URL
)
import redis
import psycopg2

class Message(object):
    def __init__(
        self,
        to_address,
        from_address,
        subject,
        body,
        credentials,
        campaign_id,
        thread_id
    ):
        self.to_address = to_address
        self.from_address = from_address
        self.subject = subject
        self.body = body
        self.credentials = credentials
        self.campaign_id = campaign_id
        self.thread_id = thread_id

class EmailJob(object):
    def __init__(
        id,
        user_id,
        step_id,
        
    ):



def create_and_send_message(message):
    msg = MIMEText(message.body)
    msg['to'] = message.to_address
    msg['from'] = message.from_address
    msg['subject'] = message.subject
    encoded_message= base64.urlsafe_b64encode(msg.as_bytes())
    raw_msg =  {'raw' : encoded_message.decode()}

    service = build(
        'gmail', 'v1', 
        http=credentials.authorize(http = httplib2.Http())
    )

    try:
        message_body = {'raw': raw_msg}
        if message.thread_id is not None:
            message_body['threadId'] = message.thread_id
        returned_message = service.users().messages().send(userId='me', body=message_body).execute()
        add_thread_to_db(returned_message, message.campaign_id)
        complete_email_job(get_current_job())
        print('Sent. Message Id: %s' % returned_message['id'])
    except (errors.HttpError, errors.Error) as e:
        print('An error occurred: %s' % e)

def send_email(message):
    conn = redis.from_url(REDIS_URL)
    q = Queue('create-task', connection=conn)
    job = q.enqueue(
        create_and_send_message,
        message
    )
    return job

def add_thread_to_db(message):
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute("""
    INSERT INTO threads
    """,
    ())
    pass

def complete_email_job(job):
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute("""
    
    """,
    ())