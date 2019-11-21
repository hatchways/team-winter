from app import db

class TagModel(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = True, nullable = False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
