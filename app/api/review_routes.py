from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..models import db, Review
from ..forms import ReviewForm

review_routes = Blueprint("reviews", __name__)

@review_routes.route("/")
@login_required
def get_all_reviews():
    """Get all reviews"""

    reviews = Review.query.all()
    return [review.to_dict() for review in reviews]