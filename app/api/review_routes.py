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

@review_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_review(id):
    """Update a review by id"""

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    user_id = current_user.to_dict()['id']

    review = Review.query.get(id)

    #validations
    if not review:
         return { "message": "Review couldn't be found" }, 404
    
    if user_id != review.owner_id:
         return { "message": "Unauthorized" }, 404
    
    #update columns
    review.review = form.data["review"]
    review.rating = form.data["rating"]

    db.session.commit()
    


    return {
        "review": review.to_dict()
    }

@review_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_review(id):
    """Delete review specified by id"""
    review = Review.query.get(id)
    user_id = current_user.to_dict()['id']

    if not review:
        return { "message": "Review couldn't be found" }, 404
    if user_id != review.owner_id:
        return { "message": "Unauthorized" }, 404
    
    db.session.delete(review)
    db.session.commit()
    
    return {"message": "Successfully deleted review"}


