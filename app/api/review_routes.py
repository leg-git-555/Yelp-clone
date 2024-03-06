from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..models import db, Review, Business
from ..forms import ReviewForm

review_routes = Blueprint("reviews", __name__)

@review_routes.route("/")
@login_required
def get_all_reviews():
    """Get all reviews"""

    reviews = Review.query.all()
    return [review.to_dict() for review in reviews]

@review_routes.route("/new", methods=['POST'])
@login_required
def create_review():
    """Create a new review"""
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #user_id is int type
    user_id = current_user.to_dict()['id']

    biz_id = form.data["business_id"]
    biz = Business.query.get(form.data["business_id"])

    #validations
    if biz.owner_id == user_id: 
        return { "message": "Unauthorized" }, 404
     
    review = Review(
        review=form.data["review"],
        rating=form.data["rating"],
        business_id=form.data["business_id"],
        owner_id=user_id
    )

    db.session.add(review)
    db.session.commit()

    return review.to_dict()
    ##this route needs more protection 

