from app import db
from utils.EmailSender import send_email
from resources.GmailResources import get_stored_credentials
from sqlalchemy import desc
import redis
import rq
from config.default import REDIS_URL
from .UserModel import UserModel
from .StepModel import StepModel
from .CampaignModel import CampaignModel
from utils.EmailSender import Message

class EmailTaskModel(db.Model):
    __tablename__ = 'email_tasks'
    
    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    step_id = db.Column(db.Integer, db.ForeignKey('steps.id'), nullable=False)
    prospect_email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(120), nullable=False)
    body = db.Column(db.VARCHAR(2000), nullable=False) 
    complete = db.Column(db.Boolean, default=False, nullable=False)

    def get_rq_job(self):

        try:
            with redis.from_url(REDIS_URL) as conn:
                rq_job = rq.job.Job.fetch(self.id, connection=conn)
        except (redis.exceptions.RedisError, rq.exceptions.NoSuchJobError):
            return None
        return rq_job

    @classmethod
    def add_jobs(cls, jobs, user_id, step_id, prospect_emails, subject, body):
        for i in range(0, len(jobs)):
            task = cls(
                id = jobs[i].id,
                user_id = user_id,
                step_id = step_id,
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
                user = UserModel.find_by_id(task.user_id)
                credentials = get_stored_credentials(task.user_id)
                step = StepModel.find_by_id(task.step_id)
                message = Message(
                    to_address = task.prospect_email,
                    from_address = user.gmail_address,
                    subject = task.subject,
                    body = task.body,
                    user_id = task.user_id,
                    credentials = credentials,
                    campaign_id = step.campaign_id,
                    thread_id = None
                )
                send_email(message)
                num_restarted += 1
        print(f'Restarted {num_restarted} email tasks.')

    @classmethod
    def count_sent_in_step(cls, step_id):
        return cls.query.filter_by(step_id=step_id).filter_by(complete=True).count()

    @classmethod
    def count_sent_in_campaign(cls, campaign_id):
        steps = CampaignModel.query.filter_by(id=campaign_id).first().steps
        count = 0
        for step in steps:
            count += cls.count_sent_in_step(step.id)
        return count
