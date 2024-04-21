from flask import render_template, request, redirect, url_for, jsonify, flash, session as login_session
from grabbi import app, db
from grabbi.models import User, Recipe
from werkzeug.security import generate_password_hash, check_password_hash
import os

@app.route('/', methods=['GET'])
def login():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def handle_login():
    # login logic here
    return render_template('index.html')