from app import db

#testing database, remove this file as necessary.
class TestModel(db.Model):
    __tablename__ = 'Tests'
    id = db.Column(db.Integer, primary_key = True)
    