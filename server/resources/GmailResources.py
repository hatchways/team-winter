from apiclient.discovery import build
from oauth2client.client import FlowExchangeError
from oauth2client.client import OAuth2Credentials
from oauth2client.client import flow_from_clientsecrets
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity, get_raw_jwt
import logging
import httplib2
import uuid

from models.UserModel import UserModel

authorize_parser = reqparse.RequestParser()
authorize_parser.add_argument('code', location='json', required=True)
authorize_parser.add_argument('state', location='json', required=True)

CLIENTSECRETS_LOCATION = 'instance/client_secrets.json'
REDIRECT_URI = 'http://localhost:3000/prospects'
SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/gmail.send'
]


class GetCredentialsException(Exception):
    """Error raised when an error occurred while retrieving credentials."""


class CodeExchangeException(GetCredentialsException):
    """Error raised when a code exchange has failed."""


class NoRefreshTokenException(GetCredentialsException):
    """Error raised when no refresh token has been found."""


class NoUserIdException(Exception):
    """Error raised when no user ID could be retrieved."""


def get_stored_credentials(user_id):
    """Retrieve stored credentials for the provided user ID. 
    (app id, not Gmail id)

    Args:
      user_id: User's ID.
    Returns:
      Stored oauth2client.client.OAuth2Credentials if found, None otherwise.
    """
    user = UserModel.find_by_id(user_id)
    if user.gmail_credentials is None:
        return None
    credentials = OAuth2Credentials.from_json(user.gmail_credentials)
    if credentials.access_token_expired():
        credentials.refresh(httplib2.Http())
        # update db with refreshed token
        user.gmail_credentials = credentials.to_json()
        user.save_to_db()
    return credentials


def store_credentials(user_id, credentials):
    """Store OAuth 2.0 credentials in the application's database.

    This function stores the provided OAuth 2.0 credentials using the user ID as
    key.

    Args:
      user_id: User's ID.
      credentials: OAuth 2.0 credentials to store.
      user_email: User's email address
    """
    user = UserModel.find_by_id(user_id)
    user_info = get_user_info(credentials)
    user.gmail_credentials = credentials.to_json()
    user.gmail_address = user_info.get('email')
    user.save_to_db()


def exchange_code(authorization_code):
    """Exchange an authorization code for OAuth 2.0 credentials.

    Args:
      authorization_code: Authorization code to exchange for OAuth 2.0
                          credentials.
    Returns:
      oauth2client.client.OAuth2Credentials instance.
    Raises:
      CodeExchangeException: an error occurred.
    """
    flow = flow_from_clientsecrets(CLIENTSECRETS_LOCATION, ' '.join(SCOPES))
    flow.redirect_uri = REDIRECT_URI
    try:
        credentials = flow.step2_exchange(authorization_code)
        return credentials
    except FlowExchangeError as e:
        logging.error('An error occurred: %s', e)
        raise CodeExchangeException(None)


def get_user_info(credentials):
    """Send a request to the UserInfo API to retrieve the user's information.

    Args:
      credentials: oauth2client.client.OAuth2Credentials instance to authorize the
                   request.
    Returns:
      User information as a dict.
    """
    user_info_service = build(
        serviceName='oauth2', version='v2',
        http=credentials.authorize(httplib2.Http()))
    user_info = None
    try:
        user_info = user_info_service.userinfo().get().execute()
    except httplib2.HttpLib2Error as e:
        logging.error('An error occurred: %s', e)
    if user_info and user_info.get('id'):
        return user_info
    else:
        raise NoUserIdException()


def get_authorization_url(state):
    """Retrieve the authorization URL.

    Args:
      state: State for the authorization URL.
    Returns:
      Authorization URL to redirect the user to.
    """
    flow = flow_from_clientsecrets(CLIENTSECRETS_LOCATION, SCOPES, redirect_uri=REDIRECT_URI)
    flow.params['access_type'] = 'offline'
    flow.params['approval_prompt'] = 'force'
    flow.params['state'] = state
    return flow.step1_get_authorize_url()


class GetAuthURL(Resource):
    @jwt_required
    def get(self):
        state = uuid.uuid4()
        user_id = get_jwt_identity()
        user = UserModel.find_by_id(user_id)
        user.gmail_auth_state = state
        user.save_to_db()
        auth_url = get_authorization_url(state)
        print(auth_url)
        return {'auth_url': auth_url}, 200


class Authorize(Resource):
    @jwt_required
    def post(self):
        data = authorize_parser.parse_args()
        user_id = get_jwt_identity()
        user = UserModel.find_by_id(user_id)
        if data['state'] == user.gmail_auth_state:
            credentials = exchange_code(data['code'])
            store_credentials(user_id, credentials)
            return {'gmail_address': user.gmail_address}, 200
        return {'error': 'state parameters did not match'}, 401

class GetGmailAddress(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()
        user_gmail = UserModel.find_by_id(user_id).gmail_address
        return {'gmail_address': user_gmail}, 200
