from flask_restful import Resource, reqparse
from models.UserModel import UserModel
from models.EmailTemplateModel import EmailTemplateModel
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import exc
from app import db

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, location='json', required=True)
parser.add_argument('type', type=str, location='json', required=True)
parser.add_argument('subject', type=str, location='json', required=True)
parser.add_argument('body', type=str, location='json', required=True)

class TemplatesById(Resource, SerializerMixin):
    @jwt_required
    def get(self, id):
        current_user = UserModel.find_by_id(get_jwt_identity())
        template = current_user.templates.filter_by(id=id).first()
        return {
            'template': template.to_dict(rules=('-owner', '-campaign', '-steps'))
        }, 200

    @jwt_required
    def put(self, id):
        data = parser.parse_args()
        current_user = UserModel.find_by_id(get_jwt_identity())
        template = current_user.templates.filter_by(id=id).first()
        if data['name'] is not None: template.name = data['name']
        if data['type'] is not None: template.type = data['type']
        if data['subject'] is not None: template.subject = data['subject']
        if data['body'] is not None: template.body = data['body']
        try:
            template.update()
            return {
                'template': template.to_dict(rules=('-owner', '-campaign', '-steps'))
            }, 200
        except ValueError as e:
            return {
              'message': str(e)
            }, 400

    @jwt_required
    def delete(self, id):
        current_user = UserModel.find_by_id(get_jwt_identity())
        template = current_user.templates.filter_by(id=id).first()
        if template is not None: 
            try:
                template.delete()
                return {
                    'message': f'Template {template.id} deleted'
                }, 200
            except exc.IntegrityError as e:
                db.session.rollback()
                return {
                    'message': f'Cannot delete template {template.id} since there is a step that uses this template'
                }, 409
        else:
            return {
                'message': 'Template not found'
            }, 404


class Templates(Resource, SerializerMixin):
    @jwt_required
    def get(self):
        current_user = UserModel.find_by_id(get_jwt_identity())
        return {
            'templates': [ t.to_dict(rules=('-owner', '-campaign', '-steps')) for t in current_user.templates.all() ]
        }, 200

    @jwt_required
    def post(self):
        data = parser.parse_args()
        current_user = UserModel.find_by_id(get_jwt_identity())
        try:
            template = EmailTemplateModel(
                name=data['name'],
                type=data['type'],
                subject=data['subject'],
                body=data['body'],
                owner_id=current_user.id
            )
            template.save_to_db()
            return {
                'template':  template.to_dict(rules=('-steps.email_template', '-steps.campaign', '-owner',
                                            '-steps.prospects'))
            }, 200
        except ValueError as e:
            return {
              'message': str(e)
            }, 400
        except Exception as e:
            return {
                'message': str(e)
            }, 500
    
