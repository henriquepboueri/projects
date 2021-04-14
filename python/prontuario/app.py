from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api

app = Flask(__name__)
app.config.from_envvar('ENV_FILE_LOCATION')
ma = Marshmallow(app)
db = SQLAlchemy(app)
db.init_app(app)

from resources.routes import initialize_routes


api = Api(app)


# initialize_db(app, db)
initialize_routes(api)
