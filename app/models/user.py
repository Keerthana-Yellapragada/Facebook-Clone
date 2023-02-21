from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
# from .new_model import Post, Comment
# from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")
    comments= db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    likes= db.relationship("Like", back_populates="user",cascade="all, delete-orphan")
    # friendships = db.relationship("Friendship", back_populates = "user", cascade="all, delete-orphan")
    # friends = db.relationship("Friend", back_populates = "user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name':self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email
            # 'friendships':[friendship.to_dict() for friendship in self.friendships] if self.friendships else None,
            # 'friends':[friend.to_dict() for friend in self.friends] if self.friends else None,
            # ,'posts': self.posts.to_dict() if self.posts else None,
            # ,'comments': self.comments.to_dict() if self.comments else None
        }
