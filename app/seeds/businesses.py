from sqlalchemy.sql import text
from ..models import db, Business
from ..models.db import environment, SCHEMA

def seed_businesses():

    businesses = [
        {
            "name": "pizzaland",
            "address": "1 Seed Street",
            "city": "Newark",
            "state": "New Jersey",
            "country": "USA",
            "category": "fast casual",
            "price": 1,
            "image_url": "https://aa-image-bucket.s3.us-east-2.amazonaws.com/pizzaland.jpg",
            "owner_id": 2
        }
    ]

    [db.session.add(Business(**business)) for business in businesses]
    db.session.commit()

def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
    