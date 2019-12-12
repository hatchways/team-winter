from sqlalchemy_serializer import SerializerMixin
from app import db 
import datetime
from sqlalchemy.schema import (
    CheckConstraint,
    UniqueConstraint
)
from sqlalchemy.orm import validates


class TemplateModel(db.Model, SerializerMixin):
    __tablename__ = 'templates'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120))
    type = db.Column(db.String(120))
    subject = db.Column(db.String(120))
    body = db.Column(db.VARCHAR(500)) 
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date_created = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    steps = db.relationship(
        'StepModel', backref='template', lazy = 'select'
    )

    __table_args__ = (
        CheckConstraint('char_length(name) > 0', name='name_min_length'),
        CheckConstraint('char_length(subject) > 0', name='subject_min_length')
    )

    @validates('name')
    def validate_name(self, key, name) -> str:
        if len(name) < 1:
            raise ValueError('name too short')
        return name

    @validates('subject')
    def validate_subject(self, key, subject) -> str:
        if len(subject) < 1:
            raise ValueError('subject too short')
        return subject

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    
    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)

    @classmethod
    def get_all_templates(cls):
        return cls.query.all()

    @classmethod
    def get_templates_by_owner_id(cls, owner_id):
        return cls.query.filter(TemplateModel.owner_id == owner_id).all()
