from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import login_required
from app.models import db, User, Post, Comment, Like
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..forms.create_post_form import CreatePostForm
from ..forms.create_comment_form import CreateCommentForm
from ..forms.create_like_form import CreateLikeForm

Base=declarative_base()

# ************************************ POSTS ROUTES ***********************************************
# *************************************************************************************************

post_routes = Blueprint("post_routes", __name__, url_prefix="/api/posts")


# ************************************ GET ALL POSTS ***********************************************

# GET ALL POSTS -- WORKS

@post_routes.route('/', methods=["GET"])
@login_required
def get_posts():
    posts = Post.query.all()
    return {'Posts': [post.to_dict() for post in posts]}


# ************************************ GET POST DETAILS BY POST ID ***********************************************

# GET POST DETAILS BY POST ID -- WORKS
@post_routes.route('/<int:post_id>/', methods=["GET"])
@login_required
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


# ************************************ CREATE NEW POST ***********************************************

# CREATE POST -- WORKS

@post_routes.route('/new/', methods=["POST"])
@login_required
def create_post():
    create_post_form = CreatePostForm()
    create_post_form['csrf_token'].data = request.cookies['csrf_token']

    print("This is current User in backend**********************", current_user)

    if create_post_form.validate_on_submit():
        # post = Post()
        data = create_post_form.data
        post = Post(
                        user_id=current_user.id,
                        post_content = data["post_content"],
                        image_url = data["image_url"],
                        )

        # new_post_obj = post.to_dict()
        # when you assign the to_dict() to new_post_obj,   it doesn't  have an id generated by db
        db.session.add(post)
        db.session.commit()
        # return new_post_obj, 201
        return post.to_dict(), 201

    return {"Error": "Validation Error"}, 401



# ************************************ EDIT POST BY POST ID***********************************************

# edit post by post id -- WORKS

@post_routes.route('/<int:post_id>/', methods=["PUT"])
@login_required
def edit_post(post_id):
    edit_post_form = CreatePostForm()

    edit_post_form['csrf_token'].data = request.cookies['csrf_token']

    if edit_post_form.validate_on_submit():
        data = edit_post_form.data
        post = Post.query.get(post_id)

        post.post_content = data["post_content"]
        post.image_url = data["image_url"]

        db.session.commit()

        new_post_obj = post.to_dict()

        return new_post_obj, 201

    return {"Error": "Validation Error"}, 401



# ************************************ DELETE POST BY POST ID***********************************************

# delete post by post id -- WORKS

@post_routes.route("/<int:post_id>/", methods=["DELETE"])
@login_required
def delete_post(post_id):

    post = Post.query.get(post_id)

    if post:
        db.session.delete(post)
        db.session.commit()

        return {"message" : "Post succesfully deleted"}, 200

    return {"Error": "404 Post Not Found"}, 404




# ************************************ CREATE NEW comment by Post Id ***********************************************

# CREATE comment -- WORKS

@post_routes.route('/<int:post_id>/comments/new/', methods=["POST"])
@login_required
def create_comment(post_id):
    create_comment_form = CreateCommentForm()
    create_comment_form['csrf_token'].data = request.cookies['csrf_token']

    print("This is current User in backend**********************", current_user)

    if create_comment_form.validate_on_submit():
        # comment = Comment()
        data = create_comment_form.data
        current_post_id=post_id
        comment = Comment(
                        user_id=current_user.id,
                        post_id=current_post_id,
                        comment_content = data["comment_content"]
                        # ,image_url = data["image_url"],
                        )


        db.session.add(comment)
        db.session.commit()

        return comment.to_dict(), 201

    return {"Error": "Validation Error"}, 401



# ************************************ ADD LIKE BY POST ID ***********************************************

# ADD LIKE by post id -- WORKS!

@post_routes.route('/<int:post_id>/likes/new/', methods=["POST"])
# @login_required
def create_like(post_id):

    create_like_form = CreateLikeForm()
    create_like_form['csrf_token'].data = request.cookies['csrf_token']

    print("This is current User in backend**********************", current_user)

    if create_like_form.validate_on_submit():
        # like = Like()
        data = create_like_form.data
        current_post_id=post_id

        like = Like(
                        user_id=current_user.id,
                        post_id=current_post_id,
                        post_like=data["post_like"],
                        post_love=data["post_love"]
        )


        db.session.add(like)
        db.session.commit()

        return like.to_dict(), 201

    return {"Error": "Validation Error"}, 401
# # ************************************ GET ALL LIKES OF A POST BY POST ID ***********************************************

@post_routes.route('/<int:post_id>/likes/', methods=["GET"])
# @login_required
def get_likes(post_id):

    likes = Like.query.all()

    filtered = filter(lambda like: (like.post_id == post_id), likes)
    post_likes = (list(filtered))
    print("POSTLIKES", post_likes)
    print("FILTERED LIKES", filtered)
    return {'Likes': [like.to_dict() for like in post_likes]}
