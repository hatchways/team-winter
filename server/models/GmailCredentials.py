from app import db

from . import UserModel

class GmailCredentials(db.Model):
    __tablename__ = 'gmail_credentials'

    user_email = db.Column(db.String(120), db.ForeignKey('users.email'), primary_key=True)
    user_gmail_id = db.Column(db.String(120), unique=True, nullable=False)
    user_gmail_credentials = db.Column(db.JSON(), nullable=False)
    user = db.relationship('UserModel', backref='gmail_credentials', lazy=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()