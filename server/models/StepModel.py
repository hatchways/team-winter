from sqlalchemy_serializer import SerializerMixin
from app import db 

class StepModel(db.Model, SerializerMixin):
    __tablename__ = 'steps'
    serialize_rules = ('-email_template.step', '-campaign')

    id = db.Column(db.Integer, primary_key = True)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    email_template = db.relationship(
        'EmailTemplateModel', backref='step', lazy = 'select', uselist = False
    )

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)