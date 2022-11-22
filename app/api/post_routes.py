from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, Comment

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
# @login_required
def get_posts():
    posts = Post.query.all()
    return {'Posts': [post.to_dict() for post in posts]}
