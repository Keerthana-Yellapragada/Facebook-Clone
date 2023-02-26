from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import login_required
from app.models import db, User, Post, Comment, Like, Friendship, Friend
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..forms.create_friendship_form import CreateFriendshipForm

Base=declarative_base()

# ************************************ FRIENDSHIP ROUTES ***********************************************
# *************************************************************************************************

friendship_routes = Blueprint("friendship_routes", __name__,url_prefix="/api/friendships")


# ************************************ GET ALL FRIENDSHIPS ***********************************************
# Get all Friendships:
@friendship_routes.route("/", methods=["GET"])
@login_required
def get_all_friendships():
    friendships = Friendship.query.all()
    return {'Friendships': [friendship.to_dict() for friendship in friendships]}







# ************************************ ADD A FRIENDSHIP ***********************************************

# Create Friendship by id

@friendship_routes.route("/new/", methods=["POST"])
@login_required
def add_friendship():
    create_friendship_form = CreateFriendshipForm()
    create_friendship_form['csrf_token'].data = request.cookies['csrf_token']

    print("*******************REACHED FRIENDSHIP CREATE BACKEND ROUTE")

    if create_friendship_form.validate_on_submit:
        print("VALIDATED ON SUBMIT")
        data = create_friendship_form.data
        new_friendship = Friendship(
            from_uid = current_user.id,
            to_uid = data["to_uid"],
            is_approved= False,

        )

        db.session.add(new_friendship)
        db.session.commit()

        return new_friendship.to_dict(), 201

    return {"Error": "Validation Error"}, 401


# ************************************ REMOVE A FRIENDSHIP ***********************************************


# delete friendship by friendship id

@friendship_routes.route("/<int:friendship_id>/", methods=["DELETE"])
@login_required
def delete_friendship(friendship_id):

    friendship = Friendship.query.get(friendship_id)

    if friendship:
        db.session.delete(friendship)
        db.session.commit()

        return {"message" : "Friendship succesfully deleted"}, 200

    return {"Error": "404 like Not Found"}, 404

# ********************************************************************************************************
