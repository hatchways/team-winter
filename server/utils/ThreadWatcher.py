import psycopg2
from config.default import (
    REDIS_URL,
    DATABASE_URL
)
from rq import (
    Queue,
    get_current_job
)
import redis
from apiclient.discovery import build
from apiclient import errors
import httplib2


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
        print ('thread id: %s - number of messages '
               'in this thread: %d') % (thread['id'], len(messages))
        if is_replied_to(thread):
            set_replied_to(thread)
        if is_final_job:
            complete_thread_job(get_current_job())
    except (errors.HttpError, error) as e:
        print('ThreadHelper: An error occurred: %s' % e)

def enqueue_update(thread_id, credentials, is_final_job):
    conn = redis.from_url(REDIS_URL)
    q = Queue(connection=conn)
    job = q.enqueue(
        update_thread,
        thread_id,
        credentials
    )
    return job

def set_replied_to(thread):
    """Mark an entry in the threads table complete in the database"""
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute("""
    UPDATE threads
    SET replied_to="true"
    WHERE id=%s
    """,
    (thread.id))
    conn.commit()
    cur.close()
    conn.close()

def complete_thread_job(job):
    """Mark a thread_task entry complete in the database"""
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute("""
    UPDATE thread_tasks
    SET complete="true"
    WHERE id=%s
    """,
    (job.id))
    conn.commit()
    cur.close()
    conn.close()

def is_replied_to(thread):
    """Return true if a thread has more than 1 message in it"""
    if len(thread.messages) > 1:
        return True
    return False

