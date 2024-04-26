from flask import render_template, request, redirect, url_for, jsonify, flash, session as login_session
from flask_cors import CORS, cross_origin
from grabbi import app, db
from grabbi.models import User, Recipe
from werkzeug.security import generate_password_hash, check_password_hash
import os

CORS(app, supports_credentials=True)

@app.route('/', methods=['GET'])
def dashboard():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def login():
    username = request.json["username"]
    password = request.json["password"]

    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({"error": "Unauth"}), 401
    
    log_user = db.session.execute(db.select(User.password).where(User.username == username)).scalar()

    if not check_password_hash(log_user, password):
        return jsonify({"error": "unauth"}), 401
    
    login_session['id'] = db.session.execute(db.select(User.id).where(User.username == username)).scalar()

    return jsonify ({
        "id": user.id,
        "email": user.username
    })
    # username = request.json['username']
    # password = request.json['password']

    # user_exists = User.query.filter_by(username=username).first()

    # if user_exists is None:
    #     return jsonify({"error": "This user does not exist. Please create an account."}), 401
    
    # log_user = db.session.execute(db.select(User.password).where(User.username == username)).scalar()

    # if check_password_hash(log_user, password):
    #     login_session['id'] = db.session.execute(db.select(User.id).where(User.username == username)).scalar()
    # else:
    #     return jsonify({'error': 'Incorrect password was entered for this user. Please try again.'}), 401
    
    # return jsonify({
    #     'id': login_session['id'],
    #     'username': username stuff.
    # })