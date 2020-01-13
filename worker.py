import redis
from rq import Worker, Queue, Connection
from config.default import REDIS_URL

listen = ['high', 'default', 'low']

conn = redis.from_url(REDIS_URL)

if __name__ == '__main__':
    with Connection(conn):
        worker = Worker(map(Queue, listen))
        worker.work()