import psycopg2
from apiclient.discovery import build
from apiclient import errors
import httplib2
from config.default import (
    REDIS_URL,
    DATABASE_URL
)
import redis
from rq import (
    Queue,
    get_current_job
)


def update_thread(thread_id, credentials, is_final_job):
    """Update the status of a single thread
    
    return the Redis job
    """
    # get number of replies for this thread
    service = build(
        'gmail', 'v1', 
        http=credentials.authorize(http = httplib2.Http())
    )
    try:
        thread = service.users().threads().get(userId="me", id=thread_id).execute()
        messages = thread['messages']
        thread_id = thread['id']
        print(f'thread id: {thread_id} - number of messages in this thread: {len(messages)}')
        if is_replied_to(thread):
            set_replied_to(thread)
        if is_final_job:
            complete_thread_job(get_current_job())
    except (errors.HttpError, errors.Error) as e:
        print('ThreadHelper: An error occurred: %s' % e)

def enqueue_thread_update(thread_id, credentials, is_final_job):
    conn = redis.from_url(REDIS_URL)
    q = Queue(connection=conn)
    job = q.enqueue(
        update_thread,
        thread_id,
        credentials,
        is_final_job
    )
    return job

def set_replied_to(thread):
    """Mark an entry in the threads table complete in the database"""
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute("""
    UPDATE threads
    SET replied_to=true
    WHERE id=%s
    """,
    (thread['id'],))
    
    conn.commit()
    cur.close()
    conn.close()

def complete_thread_job(job):
    """Mark a thread_task entry complete in the database"""
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute("""
    UPDATE thread_tasks
    SET complete=true
    WHERE id=%s
    """,
    (job.id,))

    conn.commit()
    cur.close()
    conn.close()

def is_replied_to(thread):
    """Return true if a thread has email messages from different senders"""
    messages = thread['messages']
    if len(messages) < 2:
        return False
    user_email = get_sender_email(messages[0])
    for i in range(1, len(messages)):
        sender_email = get_sender_email(messages[i])
        if user_email != sender_email:
            return True
    return False

def get_sender_email(message):
    """Get the sender's email"""
    message_headers = message['payload']['headers']
    for header in message_headers:
        if header['name'] == 'From':
            return header['value']

