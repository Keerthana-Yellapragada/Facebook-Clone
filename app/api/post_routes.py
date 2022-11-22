from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, Comment

post_routes = Blueprint('posts', __name__)

# GET ALL POSTS
@post_routes.route('/', methods=["GET"])
# @login_required
def get_posts():
    posts = Post.query.all()
    return {'Posts': [post.to_dict() for post in posts]}



# GET POST DETAILS BY POST ID
@post_routes.route('/<int:post_id>/', methods=["GET"])
# @login_required
def get_post_details(post_id):
    post = Post.query.filter(Post.id == post_id).first()
    # post_user = User.query.filter(User.id == post.user_id).first()

    if post:
        post_obj = post.to_dict()
        # post_user_obj = post_user.to_dict()
        result = {**post.to_dict()}
        response={**result}
        return response

    return { "Error": "Post not found" }, 404


# CREATE POST

@post_routes.route('/new', methods=["POST"])
# @login_required
