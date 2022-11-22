from .db import db, environment, SCHEMA
from .user import User
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base=declarative_base()



class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # title = db.Column(db.string(200), nullable=False)
    post_content = db.Column(db.String(2000), nullable=False)
    image_url = db.Column(db.String(2000), nullable=True)
    created_at = db.Column(db.DateTime(2000), nullable=False, unique=False, index=False,default=datetime.now)

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="posts")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            # 'title': self.title,
            'post_content': self.post_content,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'user': self.user.to_dict() if self.user else None

        }

    def __repr__(self):
        return f'<Post, id={self.id}, user_id={self.user_id},image_url={self.image_url}, post_content={self.post_content}, created_at={self.created_at}>'



class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    # comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=True)
    comment_content = db.Column(db.String(2000), nullable=False)

    posts = db.relationship("Post", back_populates="comments")
    # comments = db.relationship("Comment", back_populates="comments")
    user = db.relationship("User", back_populates="comments")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.coder_id,
            # 'comment_id': self.comment_id,
            'comment_content': self.comment_content,
            'user': self.user.to_dict()
            # add parent post's and comment's info?
        }

    def __repr__(self):
        return f'<Comment, id={self.id}, user_id={self.user_id}, post_id={self.post_id},comment_content={self.comment_content}, user={self.user}>'