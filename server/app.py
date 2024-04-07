from flask import render_template, request, redirect, url_for, jsonify, flash, session as login_session
from server import flask_obj, db
from server.models import User, Recipe
from werkzeug.security import generate_password_hash, check_password_hash
import os

@flask_obj.route('/', methods=['GET'])
def login():
    return render_template('index.html')

@flask_obj.route('/login', methods=['POST'])
def handle_login():
    # login logic here
    return render_template('index.html')