from app import db
from passlib.hash import pbkdf2_sha256 as sha256

class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(120), unique = True, nullable = False)
    first_name = db.Column(db.String(120))
    last_name = db.Column(db.String(120))
    password = db.Column(db.String(120), nullable = False)
    gmail_credentials = db.Column(db.JSON(), nullable = True)
    gmail_address = db.Column(db.String(120), nullable = True)
    gmail_auth_state = db.Column(db.String(120), nullable = True)
    prospects = db.relationship(
        'ProspectModel', backref='prospect_owner', lazy = 'select'
    )
    campaigns = db.relationship(
        'CampaignModel', backref='campaign_owner', lazy = 'select'
    )
    templates = db.relationship(
        'EmailTemplateModel', backref='template_owner', lazy='dynamic'
    )

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)  

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email = email).first()

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)
        
    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)

    def getName(self):
        return "{} {}".format(self.first_name, self.last_name)
