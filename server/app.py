from flask import Flask
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#creates a postgres database connection with postgresql://username:password@localhost/dbname
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost/team-winter'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#test database, remove as necessary.
class Test(db.Model):
    __tablename__ = 'Tests'
    id = db.Column(db.Integer, primary_key = True)

@app.before_first_request
def create_tables():
    db.create_all()

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

