from flask import Blueprint, jsonify, request, make_response
from app.helpers.api_helpers import APIHelpers
from app.helpers.api_exception import ApiException

bp = Blueprint('helper', __name__, url_prefix='/gym/api')

@bp.route('/test', methods=['POST'])
def test_route(job_id):
    try:
        helper = APIHelpers(request)

        response = make_response(jsonify({
            'success': True,
            'message': '',
        }))
    
        return response
    except ApiException as e:
        raise e
