from flask_wtf import FlaskForm
from app.models import db, User, Post, Comment
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required


class CreateFriendshipForm(FlaskForm):
    from_uid = IntegerField("from_uid", validators = [DataRequired()])
    to_uid = IntegerField("to_uid", validators = [DataRequired()])
    is_approved = BooleanField("is_approved", validators = [DataRequired()], default=False)
    submit = SubmitField("Add Friendship/Send Friend Request")
