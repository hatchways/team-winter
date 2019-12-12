from app import db 
from sqlalchemy_serializer import SerializerMixin

steps_prospects = db.Table('steps_prospects',
    db.Column('step_id', db.Integer, db.ForeignKey('steps.id')),
    db.Column('prospect_id', db.Integer, db.ForeignKey('prospects.id'))
)

class StepModel(db.Model, SerializerMixin):
    __tablename__ = 'steps'

    id = db.Column(db.Integer, primary_key = True)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    template_id = db.Column(db.Integer, db.ForeignKey('templates.id'))
    prospects = db.relationship(
        'ProspectModel', secondary=steps_prospects, backref='steps', lazy='select'
    )
    email_tasks = db.relationship(
        'EmailTaskModel', backref='step', lazy='select'
    )

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def add_prospects(self, prospects):
        self.prospects.extend(prospects)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)
