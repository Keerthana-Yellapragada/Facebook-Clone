from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import login_required
from app.models import db, User, Post, Comment, Like
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..forms.create_friendship_form import CreateFriendshipForm

Base=declarative_base()

# ************************************ FRIENDSHIP ROUTES ***********************************************
# *************************************************************************************************

friendship_routes = Blueprint("friendship_routes", __name__,url_prefix="/api/friendships")



# ************************************ ADD A FRIENDSHIP ***********************************************

# Create Friendship by id

@friendship_routes.route("/new/", methods=["POST"])
@login_required
def add_friendship():
    create_friendship_form = CreateFriendshiipiForm()
    create_friendship_form['csrf_token'].data = request.cookies['csrf_token']


    if create_friendship_form.validate_on_submit():
        data = create_friendship_form.data
        friendship = friendship(
            user1_id = current_user.id,
            user2_id = data["user2_id"],
            pending=data["pending"],
            approved=data["approved"]
        )

        db.session.add(friendship)
        db.session.commit()

        return friendship.to_dict(), 201

    return {"Error": "Validation Error"}, 401
