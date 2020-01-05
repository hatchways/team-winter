from flask_restful import Resource
from models.StepModel import StepModel
from models.CampaignModel import CampaignModel
from models.ProspectModel import ProspectModel
from models.TemplateModel import TemplateModel
from models.ThreadModel import ThreadModel
from models.EmailTaskModel import EmailTaskModel
from utils.RequestParserGenerator import RequestParserGenerator
from flask_jwt_extended import jwt_required, get_jwt_identity


reqParserGen = RequestParserGenerator()
campaignProspectsParser = reqParserGen.getParser(["prospect_ids"])
campaignStepsParser = reqParserGen.getParser("id")


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
            prospects.append({
                'id' : prospect.id,
                'email': prospect.email,
                'name' : prospect.name,
                'status' : prospect.status,
                'imported_from': prospect.imported_from,
                'campaigns': len(prospect.campaigns),
                'steps' : [
                        step.to_dict(rules = 
                            ('-template', '-prospects', '-campaign', '-email_tasks'))
                            for step in prospect.steps
                    ]
                })
        steps = []
        for step in current_campaign.steps:
            steps.append({'id' : step.id, 'template_id' : step.template.id})
        return {
            'campaign' : current_campaign.name,
            'prospects' : prospects,
            'steps' : steps
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
        template_id = data['id']
        if not campaign:
            return {'message': 'Campaign {} doesn\'t exist'.format(id)}, 400
        if campaign.owner_id != get_jwt_identity():
            return {'message': 'You don\'t have permission to do that.'}, 403
        new_step = StepModel(
            campaign_id = id,
            template_id = template_id 
        )
        try:
            new_step.save_to_db()
            return {
                'step' : new_step.to_dict(rules = 
                    ('-template.steps', '-template.owner', '-prospects.campaigns',
                    '-prospects.tags', '-prospects.steps', '-campaign', '-email_tasks'))
            }, 201
        except:
            return {'message': 'Something went wrong'}, 500


class GetCampaign(Resource):
    @jwt_required
    def get(self, id):
        campaign = CampaignModel.find_by_id(id)
        if not campaign:
            return {'message': 'Campaign {} doesn\'t exist'.format(id)}, 400
        if campaign.owner_id != get_jwt_identity():
            return {'message': 'You don\'t have permission to do that.'}, 403
        try:
            return {
            'campaign': {
                    'id' : campaign.id, 
                    'name' : campaign.name,
                    'creation_date' : campaign.creation_date.strftime("%b %d"), 
                    'owner_name' : campaign.owner.getName(),
                    'prospects' : len(campaign.prospects),
                    'steps' : [
                        step.to_dict(rules = 
                            ('-template.steps', '-template.owner', '-prospects.campaigns', '-email_tasks',
                            '-prospects.tags', '-prospects.steps', '-prospects.owner', '-campaign', '-email_tasks')) 
                        for step in campaign.steps
                    ]
                }
            }, 200 
        except:
            return {'message': 'Something went wrong'}, 500


class CampaignSent(Resource):
    @jwt_required
    def get(self, id):
        """Return the number of emails that have been sent for this campaign"""
        user_id = get_jwt_identity()
        campaign = CampaignModel.find_by_id(id)
        if campaign.owner.id != user_id:
            return {
                'message': 'you don\'t own this campaign'
            }, 401
        sent = EmailTaskModel.count_sent_in_campaign(id)
        return {
            'sent': sent
        }, 200


class CampaignReplies(Resource):
    @jwt_required
    def get(self, id):
        """Return the number of emails that have been replied to for this campaign"""
        user_id = get_jwt_identity()
        campaign = CampaignModel.query.filter_by(id=id).first()
        if campaign.owner.id != user_id:
            return {
                'message': 'you don\'t own that campaign'
            }, 401
        replied = ThreadModel.query.filter_by(campaign_id=id).filter_by(replied_to=True).count()
        return {
            'replied': replied
        }, 200