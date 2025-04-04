from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from app.helpers.api_exception import ApiException

class APIHelpers:
    def __init__(self, request):
        self.request = request
        
    def get_user_id(self):        
        user = get_jwt_identity()
        return user['id']

    def get_content(self):
        if self.request.is_json:
            content = self.request.json
        else:
            content = self.request.form.to_dict()
        return content

    def get_parameters(self, param, default=None):
        if self.request.method == 'GET':
            parameters = self.request.args.get(param, default)
        elif self.request.is_json:
            parameters = self.request.json.get(param, default)
        else:
            parameters = self.request.form.get(param, default)
        return parameters
    
    def has_parameters(self, param):
        """Check if parameter exists in request"""
        if self.request.method == 'GET':
            return param in self.request.args
        elif self.request.is_json:
            return param in self.request.json
        else:
            return param in self.request.form

    def validate_required_parameters(self, required_params):
        missing_params = []
        for param in required_params:
            value = self.get_parameters(param)
            if value is None or value == '':
                missing_params.append(param)
        if missing_params:
            raise ApiException(f"Missing or empty required parameters: {', '.join(missing_params)}")

    def success_response(self, data=None):
        response = {
            'success': True,
            'message': '',
        }
        if data is not None:
            response['data'] = data
        return jsonify(response)
    
    def format_error_message(field: str, reason: str) -> str:
        return f"Invalid {field}: {reason}"