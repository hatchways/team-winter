from app import db 

from . import TagModel

prospects_tags = db.Table('prospects_tags',
    db.Column('prospect_id', db.Integer, db.ForeignKey('prospects.id')),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'))
)

class ProspectModel(db.Model):
    __tablename__ = 'prospects'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(120), nullable = False)
    name = db.Column(db.String(120))
    status = db.Column(db.String(120))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    tags = db.relationship(
        'TagModel', secondary=prospects_tags, backref='prospects', lazy='select'
    )

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
   
