from flask_restful import Resource, reqparse
from models.ProspectModel import ProspectModel

from flask_jwt_extended import (jwt_required, get_jwt_identity)

upload_parser = reqparse.RequestParser()
upload_parser.add_argument('prospects', type=str, location='json', required=True)

class UploadProspects(Resource):
  #@jwt_required
  def post(self):
    prospects = upload_parser.parse_args().prospects
    # TODO: insert prospects into db
    # user_id = get_jwt_identity()
    return {'success': True}, 200

        

