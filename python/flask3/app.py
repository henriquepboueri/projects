from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_mail import Mail

from database.db import initialize_db
from flask_restful import Api
from resources.errors import errors
# from resources.movie import movies

app = Flask(__name__)
app.config.from_envvar('ENV_FILE_LOCATION')
mail = Mail(app)

from resources.routes import initialize_routes

api = Api(app, errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


initialize_db(app)
initialize_routes(api)



# movies = [
#     {
#         "name": "The Shawshank Redemption",
#         "casts": ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
#         "genres": ["Drama"]
#     },
#     {
#         "name": "The Godfather ",
#         "casts": ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
#         "genres": ["Crime", "Drama"]
#     }
# ]

# @app.route('/')
# def hello():
#     return {'hello': 'world'}

# app.register_blueprint(movies)


# @app.route('/movies', methods=['GET'])
# def get_movies():
#     return jsonify(movies)


# @app.route('/movies/<int:index>', methods=['GET'])
# def get_movie_by_id(index):
#     movie = movies[index]
#     return jsonify(movie), 200


# @app.route('/movies', methods=['POST'])
# def add_movie():
#     movie = request.get_json()
#     movies.append(movie)
#     return {"id": len(movies)}, 200


# @app.route('/movies/<int:index>', methods=['PUT'])
# def update_movie(index):
#     movie = request.get_json()
#     movies[index] = movie
#     return jsonify(movies[index]), 201


# @app.route('/movies/<int:index>', methods=['DELETE'])
# def delete_movie(index):
#     movies.pop(index)
#     return 'None', 200
