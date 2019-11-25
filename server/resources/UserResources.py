from flask_restful import Resource, reqparse
from models.UserModel import UserModel
from utils.ValidationDecorator import validate_args
from flask_jwt_extended import (create_access_token, jwt_required, get_jwt_identity)

parser = reqparse.RequestParser()
parser.add_argument('email', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)
parser.add_argument('first_name')
parser.add_argument('last_name')
parser.add_argument('confirm_pass')

class UserRegister(Resource):
    @validate_args("email", "password", "first_name", "last_name", "confirm_pass")
    def post(self):
        data = parser.parse_args()

        if UserModel.find_by_email(data['email']):
            return {'message': 'Email {} already exists'. format(data['email'])}, 400

        if len(data['password']) < 6:
             return {'message': 'Password should be at least 6 characters long'}, 400

        if data['password'] != data['confirm_pass']:
            return {'message': 'Passwords do not match'}, 400

        new_user = UserModel(
            email = data['email'],
            first_name = data['first_name'],
            last_name = data['last_name'],
            password = UserModel.generate_hash(data['password'])
        )
        try:
            new_user.save_to_db()
            access_token = create_access_token(identity = new_user.id)
            return {
                'message': 'User {} was created'.format( data['email']),
                'access_token': access_token
            }, 201
        except:
            return {'message': 'Something went wrong'}, 500

class UserLogin(Resource):
    @validate_args("email", "password")
    def post(self):
        data = parser.parse_args()
        current_user = UserModel.find_by_email(data['email'])
        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['email'])}, 400
        if UserModel.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity = current_user.id)
            return {
                'message': 'Logged in as {}'.format(current_user.email),
                'access_token': access_token
            }, 202
        else:
            return {'message': 'Wrong credentials'}, 400

class UserCampaigns(Resource):
    @jwt_required
    def get(self):
        current_user = UserModel.find_by_id(get_jwt_identity())
        campaigns = []
        for campaign in current_user.campaigns:
            campaigns.append({'id' : campaign.id, 'name' : campaign.name})
        return {
            'Campaigns': campaigns
            }, 200 


