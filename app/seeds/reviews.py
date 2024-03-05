from sqlalchemy.sql import text
from ..models import db, Review
from ..models.db import environment, SCHEMA

def seed_reviews():

    reviews = [
        {
            "review": "Pizzaland is a revelation! The crust is perfectly thin and crispy, the sauce is bursting with fresh flavor, and the toppings are always generous and top-notch. From the classic margherita to their adventurous gourmet options, Sal's never disappoints. It's become my go-to pizza spot, hands down!",
            "rating": 5,
            "owner_id": 3,
            "business_id": 1
        },
        {
            "review": f"Stepping into Centanni's is like stepping back in time to a butcher shop of the highest quality. The knowledgeable staff, many of whom are family, are eager to help you find the perfect cut, and their homemade sausages are legendary. From prime steaks to custom cuts for your freezer, Centanni's is a haven for meat lovers seeking an exceptional experience.",
            "rating": 5,
            "owner_id": 3,
            "business_id": 2
        },
        {
            "review": f"Real authentic italian food. Arties a great guy. 5 stars. Hostess is nice",
            "rating": 5,
            "owner_id": 2,
            "business_id": 3
        },
    ]

    [db.session.add(Review(**review)) for review in reviews]
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
    