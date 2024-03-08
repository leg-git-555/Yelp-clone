from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User
from ..models import db

user_routes = Blueprint('users', __name__)


#og user route
# @user_routes.route('/')
# @login_required
# def users():
#     """
#     Query for all users and returns them in a list of user dictionaries
#     """
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    users = [user.to_dict() for user in users]
    return {user["id"]: user for user in users}
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict() 

@user_routes.route('/', methods=['DELETE'])
@login_required
def delete_current_user():
    # print(current_user)
    # print(current_user.to_dict())
    user = current_user.to_dict()
    # return {"user": user }
    db.session.delete(current_user)
    db.session.commit()
    return {
        "message": "account deleted"
    }
