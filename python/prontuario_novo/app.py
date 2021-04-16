from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_restful import Api
from resources import errors

app = Flask(__name__)
app.config.from_envvar('ENV_FILE_LOCATION')
# ma = Marshmallow(app)
db = SQLAlchemy(app)

from resources.routes import initialize_routes

api = Api(app, errors=errors)
jwt = JWTManager(app)

db.init_app(app)
initialize_routes(api)