from grabbi import db
from sqlalchemy import Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import mapped_column, relationship

class User(db.Model):
    __tablename__ = 'user'
    id = mapped_column(Integer, primary_key=True)
    username = mapped_column(String, nullable=False)
    password = mapped_column(String, nullable=False)
    bookmarks = mapped_column(Text, nullable=True)
    recipes = relationship("Recipe", back_populates="user")
    bookmarks = relationship("Bookmark", back_populates="user")
    
class Recipe(db.Model):
    __tablename__ = 'recipe'
    id = mapped_column(Integer, primary_key=True)
    title = mapped_column(String, nullable=False)
    image = mapped_column(String, nullable=True)
    author = mapped_column(ForeignKey('user.id'), nullable=False)
    readyInMinutes = mapped_column(String, nullable=False)
    servings = mapped_column(String, nullable=False)
    summary = mapped_column(Text, nullable=False)
    instructions = mapped_column(Text, nullable=False)
    ingredients = mapped_column(Text, nullable=False)
    user = relationship("User", back_populates="recipes")

class Bookmark(db.Model):
    __tablename__ = 'bookmark'
    id = mapped_column(Integer, primary_key=True)
    recipe_id = mapped_column(Integer, ForeignKey('recipe.id'))
    user_id = mapped_column(Integer, ForeignKey('user.id'))
    recipe = relationship("Recipe")
    user = relationship("User", back_populates="bookmarks")
