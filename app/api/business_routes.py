from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..models import Business, db
from ..forms import BusinessForm
from .aws_helpers import upload_file_to_s3, get_unique_filename

business_routes = Blueprint("businesses", __name__)

@business_routes.route("/")
@login_required
def businesses():
    """Get all businesses"""

    businesses = Business.query.all()
    #add comment
    return {'businesses': [business.to_dict() for business in businesses]}

@business_routes.route("/new", methods=['POST'])
@login_required
def create_business():
    """Create a new business"""
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #user_id is int type
    user_id = current_user.to_dict()['id']

    if form.validate_on_submit(): 
        image = form.data['image_url']
        url = None
        
        if image:
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)

                if "url" not in upload:
                    return {
                            "message": "error occured during aws upload. idk",
                            "upload": upload
                            }
                
                url = upload['url']

        business = Business(
             name=form.data["name"],
             address=form.data["address"],
             city=form.data["city"],
             state=form.data["state"],
             country=form.data["country"],
             category=form.data["category"],
             price=form.data["price"],
             image_url=url,
             owner_id=user_id
        )
        db.session.add(business)
        db.session.commit()
        return business.to_dict()

    return {"message": "business wasn't created"}

@business_routes.route("/current", methods=['GET'])
@login_required
def get_current_users_businesses():
    """Get current user's businesses"""

    user_id = current_user.to_dict()['id']

    current_businesses = Business.query.filter_by(owner_id=user_id).all()
    current_businesses = [business.to_dict() for business in current_businesses]

    return current_businesses

@business_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_business(id):
    """Update current user's business by id"""

    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    user_id = current_user.to_dict()['id']

    biz = Business.query.get(id)

    #validations
    if not biz:
         return { "message": "Business couldn't be found" }, 404
    
    if user_id != biz.owner_id:
         return { "message": "Unauthorized" }, 404
    
    #update columns
    biz.name = form.data["name"]
    biz.address = form.data["address"]
    biz.city = form.data["city"]
    biz.state = form.data["state"]
    biz.country = form.data["country"]
    biz.category = form.data["category"]
    biz.price = form.data["price"]
    
    image = form.data['image_url']
    # url = None

    if image:
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return {
                    "message": "error occured during aws upload. idk",
                    "upload": upload
                    }
                
        # url = upload['url']
        biz.image_url = upload['url']
    
    db.session.commit()

    return{
        "biz": biz.to_dict()}

@business_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_business(id):
    """Delete business specified by id"""
    biz = Business.query.get(id)
    user_id = current_user.to_dict()['id']

    if not biz:
         return { "message": "Business couldn't be found" }, 404
    
    if user_id != biz.owner_id:
         return { "message": "Unauthorized" }, 404
    
    db.session.delete(biz)
    db.session.commit()

    return {"message": f"Successfully delete {biz.name}"}


