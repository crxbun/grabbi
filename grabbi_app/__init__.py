from flask import Flask
from sqlalchemy.orm import DeclarativeBase
from flask_sqlalchemy import SQLAlchemy
import os

static_folder = 'static'
flask_obj = Flask(__name__)

base_path = os.path.abspath(os.path.dirname(__file__))
flask_obj.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(base_path, "grabbi.db")
flask_obj.secret_key = "grabbifoodgrabber"

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(flask_obj, model_class=Base)

# from grabbi_app.models import all DB MODELS HERE
from grabbi_app.models import User, Recipe

with flask_obj.app_context():
    db.create_all()