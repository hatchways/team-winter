from app import db
from config.default import REDIS_URL
from rq.job import Job
import redis
from utils.EmailHelper import send_email
from models.UserModel import UserModel
from resources.GmailResources import get_stored_credentials
from sqlalchemy import desc

class EmailTaskModel(db.Model):
    __tablename__ = 'email_tasks'
    
    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    step_id = db.Column(db.Integer, db.ForeignKey('step.id'), nullable=False)
    prospect_email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(120), nullable=False)
    body = db.Column(db.VARCHAR(2000), nullable-False) 
    complete = db.Column(db.Boolean, default=False, nullable=False)

    def get_rq_job(self):
        try:
            with redis.from_url(REDIS_URL) as conn:
                rq_job = Job.fetch(self.id, connection=conn)
        except (redis.exceptions.RedisError, rq.exceptions.NoSuchJobError):
            return None
        return rq_job

    @classmethod
    def add_jobs(cls, jobs, user_id, prospect_emails, subject, body):
        for i in range(0, len(jobs)):
            task = cls(
                id = jobs[i].id,
                user_id = user_id
                prospect_email = prospect_emails[i],
                subject = subject,
                body = body
            )
            db.session.add(task)
        db.session.commit()

    @classmethod
    def restart_all_incomplete(cls):
        """Restart all incomplete tasks
        
        To be used when the application restarts
        """
        print('Restarting incomplete email tasks...')
        num_restarted = 0
        incomplete_tasks = cls.query.filter_by(complete=False).all()
        for task in incomplete_tasks:
            if task.get_rq_job() is None:
                # job was lost, re-enqueue with send_email
                credentials = get_stored_credentials(task.user_id)
                send_email(
                    user.gmail_address, 
                    task.prospect_email,
                    task.subject,
                    task.body, 
                    credentials
                )
                num_restarted += 1
        print(f'Restarted {num_restarted} email tasks.')


class ReplyTaskModel(db.Model):
    __tablename__ = 'reply_tasks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    final_job_id = db.Column(db.String(36), nullable=False)
    complete = db.Column(db.Boolean, default=False, nullable=False)

    def get_rq_job(self):
        try:
            with redis.from_url(REDIS_URL) as conn:
                rq_job = Job.fetch(self.final_job_id, connection=conn)
        except (redis.exceptions.RedisError, rq.exceptions.NoSuchJobError):
            return None
        return rq_job

    @classmethod
    def replies_task_complete(cls, user_id):
        task = cls.query.filter_by(user_id = user_id).order_by(desc(reply_tasks.id)).first()
        return task.complete

    