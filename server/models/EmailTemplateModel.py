from app import db 
from sqlalchemy.schema import (
    CheckConstraint,
    UniqueConstraint
)
from sqlalchemy.orm import validates


class EmailTemplateModel(db.Model):
    __tablename__ = 'email_templates'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120))
    type = db.Column(db.String(120))
    subject = db.Column(db.String(120))
    body = db.Column(db.VARCHAR(500)) 
    owner = db.Column(db.Integer, db.ForeignKey('users.id'))
    step_id = db.Column(db.Integer, db.ForeignKey('steps.id'))

    __table_args__ = (
        CheckConstraint('char_length(name) > 0', name='name_min_length'),
        CheckConstraint('char_length(subject) > 0', name='subject_min_length'),
        UniqueConstraint('owner', 'name', name='owner_name_uc')
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

    