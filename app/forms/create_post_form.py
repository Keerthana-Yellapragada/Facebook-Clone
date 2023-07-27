from flask_wtf import FlaskForm
from flask_wtf.file import  FileRequired, FileAllowed
from app.models import db, User, Post, Comment
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField, FileField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required
from ..api.s3_helpers import ALLOWED_EXTENSIONS

class CreatePostForm(FlaskForm):
    user_id = IntegerField("user_id", validators = [DataRequired()])
    post_content = StringField("post_content", validators = [DataRequired()])
    image_url = FileField("image_url", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Your Post")
