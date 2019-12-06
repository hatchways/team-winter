from flask_restful import Resource, reqparse
from models.ProspectModel import ProspectModel
from models.StepModel import StepModel
from utils.RequestParserGenerator import RequestParserGenerator
import json

from flask_jwt_extended import (jwt_required, get_jwt_identity)


upload_parser = reqparse.RequestParser()
upload_parser.add_argument('prospects', type=list, location='json', required=True)
reqParserGen = RequestParserGenerator()
stepProspectsParser = reqParserGen.getParser('prev_step_id', 'curr_step_id')

def add_owner_id(p, owner_id):
  p['owner_id'] = owner_id
  return p

class UploadProspects(Resource):
  @jwt_required
  def post(self):
    owner_id = get_jwt_identity()
    prospects = [add_owner_id(p, owner_id) for p in upload_parser.parse_args().prospects]
    ProspectModel.bulk_insert(prospects)
    return {'success': True}, 200

class InheritPreviousStepProspects(Resource):
  @jwt_required
  def post(self):
    data = stepProspectsParser.parse_args()
    prev_step = StepModel.find_by_id(data['prev_step_id'])
    curr_step = StepModel.find_by_id(data['curr_step_id'])
    if not prev_step or not curr_step:
      return {'message' : 'step not found'}, 400
    try:
      curr_step.add_prospects(prev_step.campaigns) 
      return {'success' : True}, 200
