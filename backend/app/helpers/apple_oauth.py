import os
from authlib.integrations.flask_client import OAuth
from flask import Flask

def create_oauth(app: Flask):
    oauth = OAuth(app)
    oauth.register(
        name='apple',
        client_id=os.getenv('APPLE_CLIENT_ID'),
        client_kwargs={
            'scope': 'name email',
            'token_endpoint_auth_method': 'client_secret_post',
        },
        authorize_url='https://appleid.apple.com/auth/authorize',
        authorize_params=None,
        access_token_url='https://appleid.apple.com/auth/token',
        access_token_params=None,
        refresh_token_url=None,
        redirect_uri=None,
        client_secret=os.getenv('APPLE_CLIENT_SECRET'),
    )
    return oauth