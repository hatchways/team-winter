from flask_restful import reqparse



class RequestParserGenerator:

    def getParser(self, *required_args):
        parser = reqparse.RequestParser()
        for arg in required_args:
            if type(arg) is list:
                parser.add_argument(arg[0], action='append', help='This field cannot be blank', required=True)
            else:
                parser.add_argument(arg, help='This field cannot be blank', required=True)
         
        return parser 

    def setOptionalArguments(self, parser, *optional_args):
        for arg in optional_args:
            if type(arg) is list:
                parser.add_argument(arg[0], action='append')
            else:
                parser.add_argument(arg) 
