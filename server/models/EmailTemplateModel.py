from sqlalchemy_serializer import SerializerMixin
from app import db 

class EmailTemplateModel(db.Model, SerializerMixin):
    __tablename__ = 'email_templates'
    # serialize_rules = ('-steps.email_template', '-steps.campaign')

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120))
    type = db.Column(db.String(120))
    subject = db.Column(db.String(120))
    body = db.Column(db.VARCHAR(2000)) 
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    steps = db.relationship(
        'StepModel', backref='email_template', lazy = 'select'
    )

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)

    @classmethod
    def get_all_templates(cls):
        return cls.query.all()

    @classmethod
    def get_templates_by_owner_id(cls, owner_id):
        return cls.query.filter(EmailTemplateModel.owner_id == owner_id).all()
