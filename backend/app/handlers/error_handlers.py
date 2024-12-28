import logging
import traceback
from flask import jsonify
from app.helpers.api_exception import ApiException

def register_error_handlers(app):
    @app.errorhandler(ApiException)
    def handle_api_exception(error):
        logging.error(f"ApiException: {error.message}")
        response = jsonify({
            'success': False,
            'message': str(error.message),
        })
        return response

    @app.errorhandler(Exception)
    def handle_general_exception(error):
        logging.error(f"Exception: {str(error)}")
        print("Exception occurred:", error)
        traceback.print_exc()
        response = jsonify({
            'success': False,
            'message': 'An unexpected error occurred. Please try again later.',
        })
        return response
