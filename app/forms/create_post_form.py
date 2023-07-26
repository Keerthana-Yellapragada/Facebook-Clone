from flask_wtf import FlaskForm
from app.models import db, User, Post, Comment
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField, FileField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required



class CreatePostForm(FlaskForm):
    user_id = IntegerField("User Id", validators = [DataRequired()])
    post_content = StringField("Post Content", validators = [DataRequired()])
    image_url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Your Post")
