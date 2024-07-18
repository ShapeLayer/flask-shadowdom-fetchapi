from flask import Blueprint, send_from_directory

static = Blueprint('static', __name__)

@static.route('/<path:path>')
def api_root(path):
    return send_from_directory('static', path)
