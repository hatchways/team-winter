from functools import wraps
from flask import request, abort

def validate_args(*expected_args):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            missing_args = []
            for expected_arg in expected_args:
                if expected_arg not in request.form:
                    missing_args.append(expected_arg)
            if len(missing_args) > 0:
                return {
                    "message" : "Missing following argument(s): {}".format(missing_args)
                }, 400
            return func(*args, **kwargs)
        return wrapper
    return decorator