from app import db
from app import config
from utils.ThreadHelper import update_threads


class ThreadModel(db.Model):
    __tablename__ = 'threads'

    id = db.Column(db.String(16), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    replies = db.Column(db.Integer, default=0)

    @classmethod
    def update_all_user_threads(cls, user_id):
        threads = cls.query.filter_by(user_id = user_id).all()
        if len(threads) > 0:
            update_threads(threads, config.SQLALCHEMY_DATABASE_URI)
