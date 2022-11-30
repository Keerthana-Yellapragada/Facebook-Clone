from flask_wtf import FlaskForm
from app.models import db, User, Post, Comment, Like
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required



class CreateLikeForm(FlaskForm):
    like = BooleanField("like")
    love = BooleanField("love")
    submit = SubmitField("Like or Love This")
