from .db import db, environment, SCHEMA
from .user import User
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base=declarative_base()


#  join table for posts and skills
# coder_skills = db.Table(
#     "coder_skills",
#     db.Model.metadata,
#     db.Column(
#         "coder_id",
#         db.Integer,
#         db.ForeignKey("coders.id"),
#         primary_key=True
#     ),
#     db.Column(
#         "skill_id",
#         db.Integer,
#         db.ForeignKey("skills.id"),
#         primary_key=True
#     )
# )

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # title = db.Column(db.string(200), nullable=False)
    post_content = db.Column(db.TEXT, nullable=False)
    image_url = db.Column(db.TEXT, nullable=True)
    # created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False,default=datetime.now())

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post",  cascade="all, delete-orphan")
    likes= db.relationship("Like", back_populates="post", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            # 'title': self.title,
            'post_content': self.post_content,
            'image_url': self.image_url,
            # 'created_at': self.created_at,
            'user': self.user.to_dict() if self.user else None,
            'likes': [like.to_dict() for like in self.likes]  if self.likes else None
            # 'comments' : [comment.to_dict() for comment in self.comments] if self.comments else None

        }

    def __repr__(self):
        return f'<Post, id={self.id}, user_id={self.user_id},image_url={self.image_url}, post_content={self.post_content}, created_at={self.created_at}>'



class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    # comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=True)
    comment_content = db.Column(db.Text, nullable=False)
    # created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False,default=datetime.now())

    post = db.relationship("Post", back_populates="comments")
    # comments = db.relationship("Comment", back_populates="comments")
    user = db.relationship("User", back_populates="comments")
    likes= db.relationship("Like", back_populates="comment",cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            # 'comment_id': self.comment_id,
            'comment_content': self.comment_content,
            # 'createdAt': self.created_at,
            'user': self.user.to_dict(),
            'post': self.post.to_dict()
            # add parent post's and comment's info?
        }

    def __repr__(self):
        return f'<Comment, id={self.id}, user_id={self.user_id}, post_id={self.post_id},comment_content={self.comment_content}, user={self.user}>'



class Like(db.Model):
    __tablename__="likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=True)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=True)
    post_like= db.Column(db.Boolean, nullable=False, default=False)
    post_love= db.Column(db.Boolean, nullable=False, default=False)

    post = db.relationship("Post", back_populates="likes")
    comment = db.relationship("Comment", back_populates="likes")
    user = db.relationship("User", back_populates="likes")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment_id': self.comment_id ,
            'post_like':self.post_like,
            'post_love':self.post_love,
            'user': self.user.to_dict()
        }

    def __repr__(self):
        return f'<Likes, id={self.id}, user_id={self.user_id}, post_id={self.post_id},comment_id={self.comment_id}, like={self.post_like}, love={self.post_love},user={self.user}>'
