from app import db 

class StepModel(db.Model):
    __tablename__ = 'steps'

    id = db.Column(db.Integer, primary_key = True)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    email_template = db.relationship(
        'EmailTemplateModel', backref='step', lazy = 'select', uselist = False
    )

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()