from functools import wraps
from flask import request, abort

def validate_args(*expected_args):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            json_ob = request.get_json()
            for expected_arg in expected_args:
                if expected_arg not in json_ob or json_ob.get(expected_arg) is None:
                    return abort(400)
            return func(*args, **kwargs)
        return wrapper
    return decorator