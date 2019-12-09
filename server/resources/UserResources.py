from flask_restful import Resource
from utils.RequestParserGenerator import RequestParserGenerator
from models.UserModel import UserModel
from models.CampaignModel import CampaignModel
from flask_jwt_extended import (create_access_token, jwt_required, get_jwt_identity)
from utils.ValidationDecorator import validate_args

reqParserGen = RequestParserGenerator()
registerParser = reqParserGen.getParser("email", "password", "first_name", "last_name", "confirm_pass")
loginParser = reqParserGen.getParser("email", "password")
campaignParser = reqParserGen.getParser("name")

class UserRegister(Resource):
    def post(self):
        data = registerParser.parse_args()

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
    def post(self):
        data = loginParser.parse_args()
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
        campaigns = [] # id, name, creation_date, owner_id, prospects, steps
        for campaign in current_user.campaigns:
            campaigns.append({
                'id' : campaign.id, 
                'name' : campaign.name,
                'creation_date' : campaign.creation_date.strftime("%b %d"), 
                'owner_id' : campaign.owner_id,
                'prospects' : len(campaign.prospects),
                'steps' : len(campaign.steps)  
            })
        return {
            'campaigns': campaigns
            }, 200 
    
    @jwt_required
    def post(self):
        data = campaignParser.parse_args()

        new_campaign = CampaignModel(
            name = data['name'],
            owner_id = get_jwt_identity()
        )
        try:    
            new_campaign.save_to_db()
            return {
                'campaign': {
                    'id' : new_campaign.id, 
                    'name' : new_campaign.name,
                    'creation_date' : new_campaign.creation_date.strftime("%b %d"), 
                    'owner_id' : new_campaign.owner_id,
                    'prospects' : len(new_campaign.prospects),
                    'steps' : len(new_campaign.steps)
                }
            }, 201
        except:
            return {'message': 'Something went wrong'}, 500

class UserProspects(Resource):
    @jwt_required
    def get(self):
        current_user = UserModel.find_by_id(get_jwt_identity())
        prospects = []
        for prospect in current_user.prospects:
            prospects.append({
                'id' : prospect.id,
                'email': prospect.email,
                'name' : prospect.name,
                'status' : prospect.status,
                'imported_from': prospect.imported_from,
                'campaigns': len(prospect.campaigns),
                })
        return {
            'Prospects': prospects
            }, 200 

