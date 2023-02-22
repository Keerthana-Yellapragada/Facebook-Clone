from flask_wtf import FlaskForm
from app.models import db, User, Post, Comment
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required


class CreateFriendForm(FlaskForm):
    # user_id = IntegerField("User Id", validators = [DataRequired()])
    friend_id = IntegerField("Friend Id", validators = [DataRequired()])
    submit = SubmitField("Add Friend")
