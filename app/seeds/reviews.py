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
        {
            "review": f"Best meats and italian subs in town. Patio is nice when weather is nice. Neighborhood is on its way back up",
            "rating": 5,
            "owner_id": 2,
            "business_id": 2
        },
        {
            "review": f"Look at my beautiful grandaughter in the picture. They should pay her to eat there. The uniforms the staff wear are ridiculous. The macroons are always stale. Overpriced.",
            "rating": 2,
            "owner_id": 4,
            "business_id": 4
        },
        {
            "review": f"Overrated and overpriced. Loud men always take up the patio seating. The place has gone downhill since Vincenzo Centanni passed, rest his soul.",
            "rating": 2,
            "owner_id": 4,
            "business_id": 2
        },
        {
            "review": f"Bucco's Vesuvio is without question the best Italian restaurant in New Jersey! Their homemade pasta dishes are divine, bursting with fresh flavors and perfectly cooked.  We can't wait to go back and try their signature Sunday gravy!",
            "rating": 2,
            "owner_id": 3,
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
    