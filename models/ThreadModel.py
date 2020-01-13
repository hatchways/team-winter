from app import db
from resources.GmailResources import get_stored_credentials


class ThreadModel(db.Model):
    __tablename__ = 'threads'

    id = db.Column(db.String(16), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    replied_to = db.Column(db.Boolean, default=False)

    @classmethod
    def get_all_user_threads(cls, user_id):
        threads = cls.query.filter_by(user_id = user_id).all()
        return threads
