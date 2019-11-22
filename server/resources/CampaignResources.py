from flask_restful import Resource, reqparse
from models.CampaignModel import CampaignModel

parser = reqparse.RequestParser()
parser.add_argument('email', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)
parser.add_argument('first_name')
parser.add_argument('last_name')
parser.add_argument('confirm_pass')

class NewCampaign(Resource):
    def post(self):
        data = parser.parse_args()


class CampaignProspects(Resource):
    def get(self, id):
        current_campaign = CampaignModel.find_by_id(id)
        if not current_campaign:
            return {'message': 'Campaign {} doesn\'t exist'.format(id)}, 400
        return {
                'Campaign': current_campaign.name,
                'Prospects': current_campaign.prospects 
            }, 200 