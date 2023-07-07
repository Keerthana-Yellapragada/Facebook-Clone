from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import login_required
from app.models import db, User, UserProfile
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..forms.create_profile import CreateProfileForm


Base=declarative_base()

# ************************************ profileS ROUTES ***********************************************
# *************************************************************************************************

profile_routes = Blueprint("profile_routes", __name__, url_prefix="/api/profiles")


# ************************************ GET ALL profileS ***********************************************

# GET ALL profileS -- WORKS

@profile_routes.route('/', methods=["GET"])
@login_required
def get_profiles():
    profiles = UserProfile.query.all()

    return {'profiles': [profile.to_dict() for profile in profiles]}


# ************************************ GET profile DETAILS BY profile ID ***********************************************

# GET profile DETAILS BY profile ID -- WORKS
@profile_routes.route('/<int:profile_id>/', methods=["GET"])
@login_required
def get_profile_details(profile_id):
    profile = UserProfile.query.filter(profile.id == profile_id).first()

    if profile:
        profile_obj = profile.to_dict()
        # profile_user_obj = profile_user.to_dict()
        result = {**profile.to_dict()}
        response={**result}
        return response

    return { "Error": "profile not found" }, 404


# ************************************ EDIT profile BY profile ID***********************************************

# edit profile by profile id -- WORKS

@profile_routes.route('/<int:profile_id>/', methods=["PUT"])
@login_required
def edit_profile(profile_id):
    edit_profile_form = CreateProfileForm()

    edit_profile_form['csrf_token'].data = request.cookies['csrf_token']

    if edit_profile_form.validate_on_submit():
        data = edit_profile_form.data
        profile = UserProfile.query.get(profile_id)

        profile.profile_content = data["profile_content"]


        db.session.commit()

        new_profile_obj = profile.to_dict()

        return new_profile_obj, 201

    return {"Error": "Validation Error"}, 401



# ************************************ DELETE profile BY profile ID***********************************************

# delete profile by profile id -- WORKS

@profile_routes.route("/<int:profile_id>/", methods=["DELETE"])
@login_required
def delete_profile(profile_id):

    profile = UserProfile.query.get(profile_id)

    if profile:
        db.session.delete(profile)
        db.session.commit()

        return {"message" : "profile Succesfully Deleted"}, 200

    return {"Error": "404 profile Not Found"}, 404
