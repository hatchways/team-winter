from app import db
from sqlalchemy import desc


class ThreadTaskModel(db.Model):
    __tablename__ = 'thread_tasks'

    id = db.Column(db.String(36), primary_key=True)  # id of the LAST job
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    complete = db.Column(db.Boolean, default=False, nullable=False)

    def add_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def replies_task_complete(cls, user_id):
        task = cls.query.filter_by(user_id = user_id).order_by(desc(reply_tasks.id)).first()
        return task.complete
