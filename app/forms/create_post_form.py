from flask_wtf import FlaskForm
from app.models import db, User, Post, Comment
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField, FileField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required



class CreatePostForm(FlaskForm):
    post_content = StringField("Post Content", validators = [DataRequired()])
    image_url = FileField("Image")
    submit = SubmitField("Create Your Post")
