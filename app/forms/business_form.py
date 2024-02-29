from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class BusinessForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    address = StringField("address", validators=[DataRequired()])
    city = StringField("city", validators=[DataRequired()])
    state = StringField("state", validators=[DataRequired()])
    country = StringField("country", validators=[DataRequired()])
    category = StringField("category", validators=[DataRequired()])
    price = IntegerField("price", validators=[DataRequired()])
    image_url = FileField("business image url", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    