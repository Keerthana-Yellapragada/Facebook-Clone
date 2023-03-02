# from flask import render_template, request, redirect, url_for, flash
# from .helpers import upload_file_to_s3

# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# # function to check file extension
# def allowed_file(filename):
#     return '.' in filename and \
#         filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.route("/upload", methods=["POST"])
# def create():

#     # check whether an input field with name 'user_file' exist
#     if 'user_file' not in request.files:
#         flash('No user_file key in request.files')
#         return redirect(url_for('new'))

#     # after confirm 'user_file' exist, get the file from input
#     file = request.files['user_file']

#     # check whether a file is selected
#     if file.filename == '':
#         flash('No selected file')
#         return redirect(url_for('new'))

#     # check whether the file extension is allowed (eg. png,jpeg,jpg,gif)
#     if file and allowed_file(file.filename):
#         output = upload_file_to_s3(file)

#         # if upload success,will return file name of uploaded file
#         if output:
#             # write your code here
#             # to save the file name in database

#             flash("Success upload")
#             return redirect(url_for('show'))

#         # upload failed, redirect to upload page
#         else:
#             flash("Unable to upload, try again")
#             return redirect(url_for('new'))

#     # if file extension not allowed
#     else:
#         flash("File type not accepted,please try again.")
#         return redirect(url_for('new'))
