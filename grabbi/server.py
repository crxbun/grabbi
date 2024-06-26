from flask import abort, render_template, request, redirect, url_for, jsonify, flash, session as login_session
from flask_cors import CORS, cross_origin
from grabbi import app, db
from grabbi.models import User, Recipe
from werkzeug.security import generate_password_hash, check_password_hash
from email_validator import validate_email, EmailNotValidError
import os, jwt

CORS(app, supports_credentials=True)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({"error": "Unauth"}), 401
    
    log_user = db.session.execute(db.select(User.password).where(User.username == username)).scalar()

    if not check_password_hash(log_user, password):
        return jsonify({"error": "unauth"}), 401
    
    login_session['id'] = db.session.execute(db.select(User.id).where(User.username == username)).scalar()

    # token = jwt.encode({'username': username}, 'SECRET_KEY', algorithm='HS256')
    return jsonify({'success': True}), 200

@app.route('/api/signup', methods=['GET', 'POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    print(email)
    valid_email = validate_email(email)

    if valid_email:
        print('Valid email')
    else:
        print('Invalid')
        return jsonify({'error': 'Invalid email!'}), 403

    account_exists = db.session.execute(db.select(User).where(User.username == username)).scalar()

    if bool(account_exists):
        return jsonify({"error": "User already exists!"}), 403
    
    new_user = User(username=username, password=generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Signup successful'}), 200

@app.route('/logout', methods=['POST'])
def logout():
    del login_session['id']
    return jsonify({'success': True})