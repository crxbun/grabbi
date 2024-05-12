from flask import abort, render_template, request, redirect, url_for, jsonify, flash, session as login_session
from flask_cors import CORS, cross_origin
from grabbi import app, db
from grabbi.models import User, Recipe, Bookmark
from werkzeug.security import generate_password_hash, check_password_hash
from email_validator import validate_email, EmailNotValidError
import base64, os

CORS(app, supports_credentials=True)

base_path = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(base_path, 'custom_recipe_images')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({"error": "Unauth"}), 401
    
    log_user = db.session.execute(db.select(User.password).where(User.username == username)).scalar_one_or_none()

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

    return jsonify({'message': 'Signup successful'}), 201

@app.route('/logout', methods=['POST'])
def logout():
    del login_session['id']
    return jsonify({'success': True})

@app.route('/check_recipe_id', methods=['POST'])
def check_recipe_id():
    data = request.json
    recipe_id = data.get('recipe_id')

    recipe_id_exists = db.session.execute((Recipe).where(Recipe.id == recipe_id)).scalar()

    if bool(recipe_id_exists):
        return jsonify({'exists': True})
    else:
        return jsonify({'exists': False})
    
@app.route('/create_recipe', methods=['POST'])
def create_recipe():
    title = request.form.get('title')
    author = login_session['id']
    instructions = request.form.get('instructions')
    ingredients = request.form.get('ingredients')
    recipe_id = request.form.get('recipe_id')
    readyInMinutes = request.form.get('readyInMinutes')
    servings = request.form.get('servings')
    summary = request.form.get('summary')

    image_file = request.files['image']
    
    if image_file:
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{recipe_id}.jpg")
        image_file.save(image_path)
    else:
        return jsonify({'error': 'Image data is missing!'}), 400
    recipe_id_exists = db.session.execute(db.select(Recipe).where(Recipe.id == recipe_id)).scalar()

    if bool(recipe_id_exists):
        return jsonify({'error': 'Recipe ID already exists!'}), 409
    else:
       new_recipe = Recipe(
           id=recipe_id, 
           title=title, 
           author=login_session['id'], 
           instructions=instructions, 
           ingredients=ingredients, 
           image=image_path, 
           readyInMinutes=readyInMinutes, 
           servings=servings, 
           summary=summary
           )
       
       db.session.add(new_recipe)
       db.session.commit()
       return jsonify({'message': 'Recipe created successfully!'}), 201
    
@app.route('/api/user/recipes', methods=['GET'])
def get_user_recipes():
    if 'id' not in login_session:
        return jsonify({'error': 'User not logged in!'}), 401

    user_recipes = Recipe.query.filter_by(author=login_session['id']).all()
    
    user_recipes_json = [
        {
            'id': recipe.id,
            'title': recipe.title,
            'image': recipe.image,
            'author': recipe.author,
            # 'author': User.query.get(recipe.author).username,  # Access username through the author relationship
            'readyInMinutes': recipe.readyInMinutes,
            'servings': recipe.servings,
            'summary': recipe.summary,
            'instructions': recipe.instructions,
            'ingredients': recipe.ingredients
        }
        for recipe in user_recipes
    ]

    return jsonify(user_recipes_json)

@app.route('/user-recipe/<int:userId>/<int:recipeId>', methods=['GET'])
def get_recipe_details(userId, recipeId):
    try:
        recipe = db.session.execute(db.select(Recipe).where(Recipe.id == recipeId).where(Recipe.author == userId)).scalar()
        if bool(recipe):
            return jsonify({
                    'id': recipe.id,
                    'title': recipe.title,
                    'image': recipe.image,
                    'author':  db.session.execute(db.select(User.username).where(User.id == recipe.author)).scalar(),
                    'readyInMinutes': recipe.readyInMinutes,
                    'servings': recipe.servings,
                    'summary': recipe.summary,
                    'instructions': recipe.instructions,
                    'ingredients': recipe.ingredients
             }), 200
        else:
             return jsonify({'error': 'Recipe not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500
    
@app.route('/api/user/bookmarks', methods=['GET'])
def get_user_bookmarks():
    if 'id' not in login_session:
        return jsonify({'error': 'User not logged in!'}), 401
    
    bookmarks = Bookmark.query.filter_by(user_id = login_session['id']).all()

    bookmarks_json = []

    for bookmark in bookmarks:
        recipe = db.session.execute(db.select(Recipe).where(Recipe.id == bookmark.recipe_id).where(Recipe.author == bookmark.user_id)).first()

        if recipe:
            bookmark_data = {
                'id': recipe.id,
                'title': recipe.title,
                'image': recipe.image
            }
            bookmarks_json.append(bookmark_data)

        return jsonify({'bookmarks': bookmarks_json})

    # for bookmark in bookmarks:
    #     print("Bookmark ID:", bookmark.id)
    #     print("User ID:", bookmark.user_id)
    #     print("Recipe ID:", bookmark.recipe_id)
    #     # Rest of the code to handle valid recipe


    # for bookmark in bookmarks:
    #     recipe = db.session.execute(db.select(Recipe).where(Recipe.id == bookmark.recipe_id).where(Recipe.author == login_session['id'])).scalar()
    #     print (recipe.id)
    #     if recipe:
    #         bookmark_data = {
    #             'id': recipe.id,
    #             'title': recipe.title,
    #             'image': recipe.image
    #         }
    #         bookmarks_json.append(bookmark_data)
    
    # return jsonify({'bookmarks': bookmarks_json})
    # bookmarks_json = [
    #     {
    #         'id': bookmark.recipe_id,
    #         'title': db.session.execute(db.select(Recipe.title).where(Recipe.id == bookmark.recipe_id)).scalar(),
    #         'image': db.session.execute(db.select(Recipe.image).where(Recipe.id == bookmark.recipe_id)).scalar()
    #     }
    #     for bookmark in bookmarks
    # ]
    # return jsonify(bookmarks_json)

@app.route('/api/user/bookmarks/add', methods=['POST'])
def add_bookmark():
    data = request.json
    recipe_id = data.get('id')

    new_bookmark = Bookmark(
        recipe_id=recipe_id,
        user_id=login_session['id']
    )

    db.session.add(new_bookmark)
    db.session.commit()

    return jsonify({'success': True}), 200

@app.route('/api/user/bookmarks/<int:recipe_id>', methods=['DELETE'])
def remove_bookmark(recipe_id):

    bookmark_to_remove = db.session.execute(db.select(Bookmark).where(Bookmark.recipe_id == recipe_id).where(Bookmark.user_id == login_session['id'])).scalar()
    
    db.session.delete(bookmark_to_remove)
    db.session.commit()