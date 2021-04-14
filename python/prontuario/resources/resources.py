from flask_restful import Resource
from flask import request
from .models import Usuario
from .schemas import usuarios_schema, usuario_schema
from app import db


class UsuariosResource(Resource):
    def get(self):
        usuarios = Usuario.query.all()
        return usuarios_schema.dump(usuarios)


class UsuarioResource(Resource):
    def post(self):
        body = request.get_json()
        usuario = Usuario(**body)
        usuario.hash_password()
        db.session.add(usuario)
        db.session.commit()
        return usuario_schema.dump(usuario)
