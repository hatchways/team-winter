from flask_restful import Resource
from models.StepModel import StepModel
from models.CampaignModel import CampaignModel
from models.ProspectModel import ProspectModel
from models.EmailTemplateModel import EmailTemplateModel
from utils.RequestParserGenerator import RequestParserGenerator
from flask_jwt_extended import jwt_required, get_jwt_identity


reqParserGen = RequestParserGenerator()
campaignProspectsParser = reqParserGen.getParser(["prospect_ids"])
campaignStepsParser = reqParserGen.getParser("name", "type", "subject", "body")


class CampaignProspects(Resource):
    @jwt_required
    def get(self, id):
        current_campaign = CampaignModel.find_by_id(id)
        if not current_campaign:
            return {'message': 'Campaign {} doesn\'t exist'.format(id)}, 400
        if current_campaign.owner_id != get_jwt_identity():
            return {'message': 'You don\'t have permission to do that.'}, 403
        prospects = []
        for prospect in current_campaign.prospects:
            prospects.append({'id' : prospect.id, 'name' : prospect.name})
        steps = []
        for step in current_campaign.steps:
            steps.append({'id' : step.id, 'email_template_id' : step.email_template.id})
        return {
            'Campaign' : current_campaign.name,
            'Prospects' : prospects,
            'Steps' : steps
            }, 200 

    @jwt_required
    def post(self, id):
        data = campaignProspectsParser.parse_args()
        campaign = CampaignModel.find_by_id(id)
        if not campaign:
            return {'message': 'No campaign was selected.'}, 400 
        try:
            prospects = ProspectModel.get_list_by_ids(data['prospect_ids'])
            campaign.add_prospects(prospects)
            return {
                'message': 'Prospects successfully added to campaign {}'.format(campaign.name)  
                }, 200
        except:
            return {'message': 'Something went wrong'}, 500

class CreateStepToCampaign(Resource):
    @jwt_required 
    def post(self, id):
        data = campaignStepsParser.parse_args()
        campaign = CampaignModel.find_by_id(id)
        if not campaign:
            return {'message': 'Campaign {} doesn\'t exist'.format(id)}, 400
        new_email_template = EmailTemplateModel(
            name = data["name"],
            type = data["type"],
            subject = data["subject"],
            body = data["body"]
        )
        new_step = StepModel(
            campaign_id = id,
            email_template = new_email_template  
        )
        try:
            new_email_template.save_to_db()
            new_step.save_to_db
            return {
                'message': 'Successfully created Step {} for Campaign {}'.format(new_step.id, campaign.name)
            }, 201
        except:
            return {'message': 'Something went wrong'}, 500

class GetCampaign(Resource):
    @jwt_required
    def get(self, id):
        campaign = CampaignModel.find_by_id(id)
        if not campaign:
            return {'message': 'Campaign {} doesn\'t exist'.format(id)}, 400
        return {
            'campaign': {
                    'id' : campaign.id, 
                    'name' : campaign.name,
                    'creation_date' : campaign.creation_date.strftime("%b %d"), 
                    'owner_name' : campaign.owner.getName(),
                   'prospects' : len(campaign.prospects),
                    'steps' : [step.to_dict() for step in campaign.steps]
                }
        }


        



