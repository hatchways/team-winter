from app import db 
import datetime

campaigns_prospects = db.Table('campaigns_prospects',
    db.Column('campaign_id', db.Integer, db.ForeignKey('campaigns.id')),
    db.Column('prospect_id', db.Integer, db.ForeignKey('prospects.id'))
)

class CampaignModel(db.Model):
    __tablename__ = 'campaigns'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120))
    creation_date = Column(DateTime, default=datetime.datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    prospects = db.relationship(
        'ProspectModel', secondary=campaigns_prospects, backref='campaigns', lazy='select'
    )
    
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id = id).first()
    



