from apiclient.discovery import build
from oauth2client.client import FlowExchangeError
from oauth2client.client import Credentials
from oauth2client.client import flow_from_clientsecrets
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging
import httplib2

from models import GmailCredentials
from models import UserModel

authorize_parser = reqparse.RequestParser()
authorize_parser.add_argument('code', required=True)

CLIENTSECRETS_LOCATION = 'instance/client_secrets.json'
REDIRECT_URI = 'http://localhost:5000/gmail/authorize'
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
    credentials_json = GmailCredentials.filter_by(id=user_id)
    return Credentials.new_from_json(credentials_json)


def store_credentials(user_id, credentials, user_email):
    """Store OAuth 2.0 credentials in the application's database.

    This function stores the provided OAuth 2.0 credentials using the user ID as
    key.

    Args:
      user_id: User's ID.
      credentials: OAuth 2.0 credentials to store.
      user_email: User's email address
    """
    new_credentials = GmailCredentials(
        user_email=user_email,
        gmail_user_id=user_id,
        gmail_credentials=credentials.to_json()
    )
    GmailCredentials.save_to_db()


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
    flow = flow_from_clientsecrets(CLIENTSECRETS_LOCATION, ' '.join(SCOPES))
    flow.params['access_type'] = 'offline'
    flow.params['approval_prompt'] = 'force'
    flow.params['state'] = state
    return flow.step1_get_authorize_url(REDIRECT_URI)


class GetAuthURL(Resource):
    def get(self):
        # will handle state later, need to get this working for now
        state=None
        auth_url = get_authorization_url(state)
        return {'auth_url': auth_url}, 200


class Authorize(Resource):
    @jwt_required
    def get(self):
        data = authorize_parser.parse_args()
        credentials = exchange_code(data['code'])
        user_info = get_user_info(credentials)
        user_id = user_info.get('id')
        user_email = get_jwt_identity()
        store_credentials(user_id, credentials, user_email)
        return {'success': True}, 200
