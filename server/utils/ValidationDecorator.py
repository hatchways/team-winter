<<<<<<< HEAD
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
=======
from functools import wraps
from flask import request

def validate_args(*expected_args):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not request.data:
                return {
                    "message" : "Missing following argument(s): {}".format(list(expected_args))
                }, 400
            missing_args = []
            for expected_arg in expected_args:
                if expected_arg not in request.get_json():
                    missing_args.append(expected_arg)
            if len(missing_args) > 0:
                return {
                    "message" : "Missing following argument(s): {}".format(missing_args)
                }, 400
            return func(*args, **kwargs)
        return wrapper
>>>>>>> 573be1d2661aab00b1a5eafa43ac62a1176cf16d
    return decorator