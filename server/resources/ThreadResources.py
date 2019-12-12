from flask_restful import Resource
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from models.ThreadModel import ThreadModel
from models.ThreadTaskModel import ThreadTaskModel
from models.UserModel import UserModel
from utils.ThreadWatcher import update_thread
from .GmailResources import get_stored_credentials
from config.default import DATABASE_URL

class Update(Resource):
    @jwt_required
    def get(self):
        """Update all threads owned by a user"""
        user_id = get_jwt_identity()
        credentials = get_stored_credentials(user_id)
        threads = ThreadModel.get_user_threads()
        if len(threads) == 0:
            return {
                'message': 'no threads for this user'
            }, 200
        for t in threads[0:-1]:
            __ = update_thread(t.id, credentials, False)
        final_job = update_thread(threads[-1].id, credentials, True)
        task = ThreadTaskModel(final_job.id, user_id)
        task.add_to_db()
        return {
            'message': 'updating this user\'s threads'
        }, 200

class Status(Resource):
    @jwt_required
    def get(self, campaign_id):
        """Return a message indicating whether the last thread update for this user has completed"""
        user_id = get_jwt_identity()
        complete = ThreadModel.replies_task_complete(user_id)
        if complete == True:
            return {
                'status': 'complete'
            }, 200
        elif complete == False:
            return {
                'status': 'incomplete'
            }, 202
        else:
            return {
                'message': 'no task found'
            }, 404


