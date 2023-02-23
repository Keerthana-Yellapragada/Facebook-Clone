from flask_wtf import FlaskForm
from app.models import db, User, Post, Comment
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required


class CreateFriendshipForm(FlaskForm):
    user1_id = IntegerField("User1 Id", validators = [DataRequired()])
    user2_id = IntegerField("User2 Id", validators = [DataRequired()])
    pending = BooleanField("pending", default=True)
    approved = BooleanField("approved", default=False)
    submit = SubmitField("Add Friendship")
