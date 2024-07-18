from flask import Blueprint, jsonify, request, make_response
import sys
api = Blueprint('api', __name__)

@api.route('/')
def api_root():
    return make_response(
        jsonify({
            'status': 'success',
            'detail': 'new awesome root fetch is succeed.'
        }), 200
    )

@api.route('/add', methods=['POST'])
def api_add():
    params = request.get_json()

    if 'username' not in params:
        return make_response(
            jsonify({
                'status': 'failed',
                'detail': 'key `username` required.'
            }), 400
        )
    return make_response(
        jsonify({
            'status': 'success',
            'detail': f'user `{params["username"]}` added.'
        }), 200
    )
