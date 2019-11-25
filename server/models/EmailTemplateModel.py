from app import db 

class EmailTemplateModel(db.Model):
    __tablename__ = 'email_templates'

    id = db.Column(db.Integer, primary_key = True)
    type = db.Column(db.String(120))
    subject = db.Column(db.String(120))
    body = db.Column(db.VARCHAR(500)) 
    step_id = db.Column(db.Integer, db.ForeignKey('steps.id'))