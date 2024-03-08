from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='demo', last_name='user', profile_image_url='url')
    tony = User(
        username='TonySoprano', email='tony@aa.io', password='password', first_name='Tony', last_name='Soprano', profile_image_url='https://aa-image-bucket.s3.us-east-2.amazonaws.com/tony.jpg')
    carmela = User(
        username='CarmelaSoprano', email='carmela@aa.io', password='password', first_name='Carmela', last_name='Soprano', profile_image_url='https://aa-image-bucket.s3.us-east-2.amazonaws.com/carmela.jpg')
    livia = User(
        username='LiviaSoprano', email='livia@aa.io', password='password', first_name='Livia', last_name='Soprano', profile_image_url='https://aa-image-bucket.s3.us-east-2.amazonaws.com/livia.jpg')
    junior = User(
        username='JuniorSoprano', email='junior@aa.io', password='password', first_name='Corado', last_name='Soprano', profile_image_url='https://aa-image-bucket.s3.us-east-2.amazonaws.com/junior.jpg')
    artie = User (
        username='ArtieBucco', email='artie@aa.io', password='password', first_name='Artie', last_name='Bucco', profile_image_url='https://aa-image-bucket.s3.us-east-2.amazonaws.com/artie.jpg')


    db.session.add(demo)
    db.session.add(tony)
    db.session.add(carmela)
    db.session.add(livia)
    db.session.add(junior)
    db.session.add(artie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
