import datetime
import os

TEAM_NAME="Shums, Yangeng Chen, Crystal Low, Benjamin Jenkins"
BUNDLE_ERRORS = True
SQLALCHEMY_TRACK_MODIFICATIONS=False
JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(30)
WTF_CSRF_ENABLED = True
REDIS_URL = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://postgres:1234@localhost/team-winter')

