from flask_restful import Resource, reqparse
from models.CampaignModel import CampaignModel
from flask_jwt_extended import jwt_required, get_jwt_identity

parser = reqparse.RequestParser()
parser.add_argument('name')

class NewCampaign(Resource):
    @jwt_required
    def post(self):
        data = parser.parse_args()

        new_campaign = CampaignModel(
            name = data['name'],
            owner_id = get_jwt_identity()
        )
        try:    
            new_campaign.save_to_db()
            return {
                'message': 'Campaign {} was created'.format( data['name'])
            }, 201
        except:
            return {'message': 'Something went wrong'}, 500

class CampaignProspects(Resource):
    def get(self, id):
        current_campaign = CampaignModel.find_by_id(id)
        if not current_campaign:
            return {'message': 'Campaign {} doesn\'t exist'.format(id)}, 400
        prospects = []
        for prospect in current_campaign.prospects:
            prospects.append('id:{} '.format(prospect.id) + prospect.name)
        return {
            'Campaign': current_campaign.name,
            'Prospects': prospects
            }, 200 
        