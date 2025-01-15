import logging
import traceback
from flask import jsonify, request, current_app
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
    
    @app.errorhandler(404)
    def handle_404_error(error):
        routes = [str(rule) for rule in current_app.url_map.iter_rules()]
        logging.error(f"404 Error: {request.url}")
        logging.error(f"Available routes: {routes}")

        response = jsonify({
            'success': False,
            'message': 'Invalid endpoint. Please check the API documentation.',
        })
        return response, 404

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
