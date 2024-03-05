from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = TextAreaField("review", validators=[DataRequired()])
    rating = IntegerField("review", validators=[DataRequired()])