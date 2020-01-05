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
        user_id,
        credentials,
        campaign_id,
        thread_id
    ):
        self.to_address = to_address
        self.from_address = from_address
        self.subject = subject
        self.body = body
        self.user_id = user_id
        self.credentials = credentials
        self.campaign_id = campaign_id
        self.thread_id = thread_id


def send_message(message):
    msg = MIMEText(message.body, 'html')
    msg['to'] = message.to_address
    msg['from'] = message.from_address
    msg['subject'] = message.subject
    if message.thread_id is not None:
        msg['threadId'] = message.thread_id
    encoded_message= base64.urlsafe_b64encode(msg.as_bytes())
    raw_msg =  {'raw' : encoded_message.decode()}

    service = build(
        'gmail', 'v1', 
        http=message.credentials.authorize(http = httplib2.Http())
    )

    try:
        returned_message = service.users().messages().send(userId='me', body=raw_msg).execute()
        add_thread_to_db(returned_message['threadId'], message.user_id, message.campaign_id)
        complete_email_job(get_current_job())
        print('Sent. Message Id: %s' % returned_message['id'])
    except (errors.HttpError, errors.Error) as e:
        print('An error occurred: %s' % e)

def send_email(message):
    conn = redis.from_url(REDIS_URL)
    q = Queue(connection=conn)
    job = q.enqueue(
        send_message,
        message
    )
    return job

def add_thread_to_db(thread_id, user_id, campaign_id):
    """Add a ThreadModel to the db manually"""

    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute("""
    INSERT INTO threads (id, user_id, campaign_id)
    VALUES (%s, %s, %s)
    """,
    (thread_id, user_id, campaign_id) )
    conn.commit()
    cur.close()
    conn.close()

def complete_email_job(job):
    """Set an EmailTask object to complete manually"""

    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute("""
    UPDATE email_tasks
    SET complete=true
    WHERE id=%s
    """,
    (job.id,) )
    conn.commit()
    cur.close()
    conn.close()
