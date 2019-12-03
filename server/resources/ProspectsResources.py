from flask_restful import Resource, reqparse
from models.ProspectModel import ProspectModel
import json

from flask_jwt_extended import (jwt_required, get_jwt_identity)


upload_parser = reqparse.RequestParser()
upload_parser.add_argument('prospects', type=list, location='json', required=True)

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
