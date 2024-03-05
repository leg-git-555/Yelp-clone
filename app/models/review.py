from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)

    """ one-to-many (many) """
    owner = db.relationship("User", back_populates="user_reviews")
    business = db.relationship("Business", back_populates="business_reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "review": self.review,
            "rating": self.rating,
            "owner_id": self.owner_id,
            "business_id": self.business_id
        }