from flask_restful import Resource, reqparse
from models.UserModel import UserModel
from models.EmailTemplateModel import EmailTemplateModel
from flask_jwt_extended import (jwt_required, get_jwt_identity)
import psycopg2

templatesOneGetParser = reqparse.RequestParser()
templatesOneGetParser.add_argument('id', type=int, location='json', required=True)

templatesOnePostParser = reqparse.RequestParser()
templatesOnePostParser.add_argument('name', type=str, location='json', required=True)
templatesOnePostParser.add_argument('type', type=str, location='json', required=True)
templatesOnePostParser.add_argument('subject', type=str, location='json', required=True)
templatesOnePostParser.add_argument('body', type=str, location='json', required=True)

templatesOnePutParser = reqparse.RequestParser()
templatesOnePutParser.add_argument('id', type=int, location='json', required=True)
templatesOnePutParser.add_argument('name', type=str, location='json')
templatesOnePutParser.add_argument('type', type=str, location='json')
templatesOnePutParser.add_argument('subject', type=str, location='json')
templatesOnePutParser.add_argument('body', type=str, location='json')

class AllTemplates(Resource):
    @jwt_required
    def get(self):
        current_user = UserModel.find_by_id(get_jwt_identity())
        templates = [ serializableTemplate(t) for t in current_user.templates.all() ]
        return {
            'templates': templates
        }, 200


class OneTemplate(Resource):
    @jwt_required
    def get(self):
        data = templatesOneGetParser.parse_args()
        current_user = UserModel.find_by_id(get_jwt_identity())
        template = current_user.templates.filter_by(id=data.id).first()
        return {
            'template': serializableTemplate(template)
        }, 200
        

    @jwt_required
    def post(self):
        data = templatesOnePostParser.parse_args()
        print(data)
        current_user = UserModel.find_by_id(get_jwt_identity())
        try:
            template = EmailTemplateModel(
                name=data['name'],
                type=data['type'],
                subject=data['subject'],
                body=data['body'],
                owner=current_user.id
            )
            template.save_to_db()
            return {
                'template': serializableTemplate(template)
            }, 200
        except ValueError as e:
            return {
              'message': str(e)
            }, 400
        except Exception as e:
            return {
                'message': str(e)
            }, 500


    @jwt_required
    def put(self):
        data = templatesOnePutParser.parse_args()
        current_user = UserModel.find_by_id(get_jwt_identity())
        template = current_user.templates.filter_by(id=data['id']).first()
        if data['name'] is not None: template.name = data['name']
        if data['type'] is not None: template.type = data['type']
        if data['subject'] is not None: template.subject = data['subject']
        if data['body'] is not None: template.body = data['body']
        try:
            template.update()
            return {
                'template': serializableTemplate(template)
            }, 200
        except ValueError as e:
            return {
              'message': str(e)
            }, 400

def serializableTemplate(template):
    ret = {
        'id': template.id,
        'name': template.name,
        'type': template.type,
        'subject': template.subject,
        'body': template.body
    }
    return ret