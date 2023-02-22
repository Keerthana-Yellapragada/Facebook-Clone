from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import login_required
from app.models import db, User, Post, Comment, Like
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..forms.create_friend_form import CreateFriendForm

Base=declarative_base()

# ************************************ FRIENDS ROUTES ***********************************************
# *************************************************************************************************

friend_routes = Blueprint("friend_routes", __name__,url_prefix="/api/posts")



# ************************************ ADD A FRIEND ***********************************************

# Create Friendship/Add a friend by id

@friend_routes.route("/new/", methods=["POST"])
@login_required
def add_friend():
    create_friend_form = CreateFriendForm()
    create_friend_form['csrf_token'].data = request.cookies['csrf_token']


    if create_friend_form.validate_on_submit():
        data = create_friend_form.data
        friend = friend(
            user_id = current_user.id,
            friend_id = data["friend_id"],
        )

        db.session.add(friend)
        db.session.commit()

        return friend.to_dict(), 201

    return {"Error": "Validation Error"}, 401
