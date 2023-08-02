from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import login_required
from app.models import db, User, Post, Comment, Like
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..forms.create_post_form import CreatePostForm
from ..forms.create_comment_form import CreateCommentForm
from ..forms.create_like_form import CreateLikeForm
from .s3_helpers import *

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


# ************************************ CREATE NEW POST with AWS ***********************************************

# CREATE POST -- WORKS

@post_routes.route('/new/', methods=["POST"])
@login_required
def create_post():


    # print("DID IT ENTER THE CREATE_POST FUCNTION")

    #request.files is in the a dictionary: in this case {thumbnail_pic: <filestorage: 'xxxx.jpg'>, content: <filestorage:'xxxx.mp4'>} xxxhere are the name you stored this file in our local folder
    # print("REQUEST FORMDATA************************", request.form)
    # print("REQUEST FileDATA************************", request.files)

    if "post_content" not in request.form:
        return {"errors": "Form data is required."}, 401

    if "image_url" not in request.files:
        return {"errors": "Image file is required."}, 401


    # print("THIS IS imageurl in request.files---------!!!!!!!----------- ", request.files["image_url"])
    image_url=request.files["image_url"]

    # print("THIS IS IMAGE URL FROM FRONTEND BEFORE AWS", image_url)

    #request.filename is the string of file name: 'xxx.mp4'
    if not allowed_file(image_url.filename):
        return {"errors": "This file does not meet the format requirement."}, 402

    #here is to get the unique/hashed filename: the file name here are random letters and numbers, not the one you originally named in your local folder

    image_url.filename=get_unique_filename(image_url.filename)

    # print("------- this is IMAGEURL FILENAME!!!!!!!!!!!!!!!!-------", image_url.filename)


    #image_upload will return {"url": 'http//bucketname.s3.amazonaws.com/xxxx.jpg} xxx are the random letter and numbers filename

    image_uploaded = upload_file_to_s3(image_url)

    # print("-----------THIS IS IMAGE_uploaded!!!!!!!!!!!!!!!!!!!!!!!!!------", image_uploaded)

    if "url" not in image_uploaded:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message

        return image_uploaded, 403

    #this url will be store in the database. The database will only have this url, not the actual photo or video which are stored in aws.

    image_url_main=image_uploaded["url"]

    # flask_login allows us to get the current user from the request

    #here we will form a video and save it to the db according to the keys defined in the model
    #while description and title are obtained from request.form
    #request.form returns a object similar format as request.files : {"title": xxx, "description": xxx}

    # print("current_user", current_user)


    create_post_form = Post(
        user_id=current_user.id,
        post_content = request.form.get("post_content"),
        image_url = image_url_main

    )

    # print('uploaded_image!!!!!!!!!!!!!!!!!', image_url_main)

    db.session.add(create_post_form)
    db.session.commit()

    #then add and commit to database, in this process the new video id and createdat, updated at will be generated
    # db.session.add(create_post_form)
    # db.session.commit()
    # since the id, created at and updated at are new info, refresh() function is needed to send those info to the frontend
    # so that it knows which page to turn to . and then to update the time accordingly


    db.session.refresh(create_post_form)

    # print(create_post_form.to_dict())

    return  create_post_form.to_dict()

    return {"Error": "Validation Error"}, 401

# ************************************ EDIT POST BY POST ID***********************************************

# edit post by post id -- WORKS

@post_routes.route('/<int:post_id>/', methods=["PUT"])
@login_required
def edit_post(post_id):
    edit_post_form = CreatePostForm()

    print("ENTERED EDIT POST BACKEND")



    edit_post_form['csrf_token'].data = request.cookies['csrf_token']

    if edit_post_form.validate_on_submit():

        print("DATA WAS VALIDATED")
        data = edit_post_form.data
        post = Post.query.get(post_id)

    if "post_content" not in request.form:
        return {"errors": "Form data is required."}, 401

    if "image_url" not in request.files:
        return {"errors": "Image file is required."}, 401


    # print("THIS IS imageurl in request.files---------!!!!!!!----------- ", request.files["image_url"])
    image_url=request.files["image_url"]

    if not allowed_file(image_url.filename):
        return {"errors": "This file does not meet the format requirement."}, 402

    image_url.filename=get_unique_filename(image_url.filename)
    image_uploaded = upload_file_to_s3(image_url)
    if "url" not in image_uploaded:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message

        return image_uploaded, 403

    #this url will be store in the database. The database will only have this url, not the actual photo or video which are stored in aws.

    image_url_main=image_uploaded["url"]
    print("IMAGE URL MAIN IN BACKEND", image_url_main)

    # flask_login allows us to get the current user from the request

    #here we will form a video and save it to the db according to the keys defined in the model
    #while description and title are obtained from request.form
    #request.form returns a object similar format as request.files : {"title": xxx, "description": xxx}

    # print("current_user", current_user)


    print("THIS IS DATA POST_CONTENT!!!!!!!!!!!!-------------------", data["post_content"])

    post.post_content = request.form.get("post_content")
    post.image_url = image_url_main



    db.session.commit()

    new_post_obj = post.to_dict()
    db.session.refresh(edit_post_form)
    return new_post_obj.to_dict(), 201

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

    return {'Likes': [like.to_dict() for like in post_likes]}
