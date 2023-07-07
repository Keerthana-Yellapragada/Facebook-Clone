from flask_wtf import FlaskForm
from app.models import db, User, Post, Comment
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required



class CreateProfileForm(FlaskForm):
    first_name = StringField("First Name", validators = [DataRequired()])
    last_name = StringField("Last Name", validators = [DataRequired()])
    email = StringField("email", validators = [DataRequired()])
    bio=StringField("About Me", validators = [DataRequired()])
    gender=SelectField("Gender", validators=[DataRequired()])
    month=SelectField("Month", validators = [DataRequired()])
    day=SelectField("Day", validators = [DataRequired()])
    year=SelectField("Year", validators = [DataRequired()])
    image_url = StringField("Image")
    submit = SubmitField("Create Your Post")
