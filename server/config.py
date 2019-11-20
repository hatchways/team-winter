import os, datetime

TEAM_NAME = os.environ['TEAM_NAME']

SQLALCHEMY_TRACK_MODIFICATIONS = False
JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(30)