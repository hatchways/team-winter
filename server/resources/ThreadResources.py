from flask_restful import Resource
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from models.ThreadModel import ThreadModel

class UpdateThreads(Resource):
    @jwt_required
    def get(self):
        ThreadModel.update_all_user_threads(get_jwt_identity())
        return {
            'message': 'Updating all threads'
        }, 200


class ThreadsStatus(Resource):
    @jwt_required
    def get(self):
        
