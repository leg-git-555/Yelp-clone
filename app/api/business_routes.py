from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..models import Business
from ..forms import BusinessForm

business_routes = Blueprint("businesses", __name__)

@business_routes.route("/")
@login_required
def businesses():
    """Get all businesses"""
    bs = Business.query.all()
    #add comment
    pass