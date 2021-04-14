from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_mysqldb import MySQLdb


app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/flask-alchemy-marsh'
# app.config.from_envvar('ENV_FILE_LOCATION')
db = SQLAlchemy(app)
db.init_app(app)
api = Api(app)
ma = Marshmallow(app)

import resources.post

if __name__ == '__main__':
    app.run(debug=True)
