from flask import Flask
from sqlalchemy.orm import DeclarativeBase
from flask_sqlalchemy import SQLAlchemy
import os

static_folder = 'static'
app = Flask(__name__)

base_path = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(base_path, "grabbi.db")
app.secret_key = "grabbifoodgrabber"

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(app, model_class=Base)

# from grabbi_app.models import all DB MODELS HERE
from grabbi.models import User, Recipe

with app.app_context():
    db.create_all()