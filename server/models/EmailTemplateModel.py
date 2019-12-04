from sqlalchemy_serializer import SerializerMixin
from app import db 

class EmailTemplateModel(db.Model, SerializerMixin):
    __tablename__ = 'email_templates'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120))
    type = db.Column(db.String(120))
    subject = db.Column(db.String(120))
    body = db.Column(db.VARCHAR(2000)) 
    step_id = db.Column(db.Integer, db.ForeignKey('steps.id'))

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)