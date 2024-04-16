from server import db
from sqlalchemy import Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import mapped_column

class User(db.Model):
    __tablename__ = 'user'
    id = mapped_column(Integer, primary_key=True)
    username = mapped_column(String, nullable=False)
    password = mapped_column(String, nullable=False)
    
class Recipe(db.Model):
    __tablename__ = 'recipe'
    id = mapped_column(Integer, primary_key=True)
    title = mapped_column(String, nullable=False)
    body = mapped_column(Text, nullable=False)
    user_id = mapped_column(ForeignKey('user.id'), nullable=False)

