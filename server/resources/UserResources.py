from flask_restful import Resource, reqparse
from models.UserModel import UserModel
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

parser = reqparse.RequestParser()
parser.add_argument('email', help = 'This field cannot be blank', required = True)
parser.add_argument('fname', help = 'This field cannot be blank', required = True)
parser.add_argument('lname', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)
parse.add_argument('confirm_pass', help = 'This field cannot be blank', required = True)

class UserRegister(Resource):
    def post(self):
        data = parser.parse_args()

        if UserModel.find_by_email(data['email']):
            return {'message': 'Email {} already exists'. format(data['email'])}, 400

        if len(data['password'] < 6):
             return {'message': 'Password should be at least 6 characters long'}, 400

        if data['password'] != data['confirm_pass']:
            return {'message': 'Passwords do not match'}, 400

        new_user = UserModel(
            username = data['email'],
            fname = data['fname'],
            lname = data['lname'],
            password = UserModel.generate_hash(data['password'])
        )
        try:
            new_user.save_to_db()
            access_token = create_access_token(identity = data['email'])
            refresh_token = create_refresh_token(identity = data['email'])
            return {
                'message': 'User {} was created'.format( data['email']),
                'access_token': access_token,
                'refresh_token': refresh_token
            }, 201
        except:
            return {'message': 'Something went wrong'}, 500



class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()
        current_user = UserModel.find_by_email(data['email'])
        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['email'])}, 400
        if UserModel.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity = data['email'])
            refresh_token = create_refresh_token(identity = data['email'])
            return {
                'message': 'Logged in as {}'.format(current_user.email),
                'access_token': access_token,
                'refresh_token': refresh_token
            }, 202
        else:
            return {'message': 'Wrong credentials'}, 400