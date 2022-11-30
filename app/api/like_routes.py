from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import login_required
from app.models import db, User, Post, Comment, Like
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..forms.create_like_form import CreateLikeForm


Base=declarative_base()

# ************************************ likeS ROUTES ***********************************************
# *************************************************************************************************

like_routes = Blueprint("like_routes", __name__, url_prefix="/api/likes")


# ************************************ EDIT LIKE BY LIKE ID***********************************************

# edit like by like id -- WORKS

@like_routes.route('/<int:like_id>/', methods=["PUT"])
@login_required
def edit_like(like_id):
    edit_like_form = CreateLikeForm()

    edit_like_form['csrf_token'].data = request.cookies['csrf_token']

    if edit_like_form.validate_on_submit():
        data = edit_like_form.data
        like = Like.query.get(like_id)

        like.like = data["like"]
        like.love = data["love"]

        db.session.commit()

        new_like_obj = like.to_dict()

        return new_like_obj, 201

    return {"Error": "Validation Error"}, 401



# ************************************ DELETE like BY like ID***********************************************

# delete like by like id -- WORKS

@like_routes.route("/<int:like_id>/", methods=["DELETE"])
@login_required
def delete_like(like_id):

    like = Like.query.get(like_id)

    if like:
        db.session.delete(like)
        db.session.commit()

        return {"message" : "like succesfully deleted"}, 200

    return {"Error": "404 like Not Found"}, 404

# *********************************************************************************************************
