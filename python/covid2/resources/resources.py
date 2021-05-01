from flask import request
from resources.utils import genExpDateInMilSecs
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_restful import Resource
import datetime
from app import db
from .schemas import CovidSchema, LoginSchema, UsuarioSchema, usuarios_schema, usuario_schema
from .models import CovidAnamnese, Login, Usuario
from resources.errors import BadRequestError, CredentialsInvalidError, MissingAuthorizationTokenError, NoContentError, UnauthorizedError, InternalServerError, _IntegrityError
from flask_jwt_extended.exceptions import NoAuthorizationError
from marshmallow.exceptions import ValidationError
from sqlalchemy.exc import IntegrityError


class UsuariosResource(Resource):
    @jwt_required()
    def get(self):
        try:
            # usuario = Usuario.query.get(get_jwt_identity())

            # if not usuario.isAdmin():
            #     return {'erro': "Usuário não é administrador"}, 401

            usuarios = Usuario.query.all()
            return UsuarioSchema().dump(usuarios, many=True)
            # return usuarios_schema.dump(usuarios)
        except Exception as e:
            raise InternalServerError

    @jwt_required()
    def post(self):
        try:
            body = request.get_json()
            usuario = Usuario(**body)
            usuario.hash_password()
            db.session.add(usuario)
            db.session.commit()
            return usuario_schema.dump(usuario)
        except Exception as e:
            return e


class UsuarioResource(Resource):

    def get(self, id):
        # try:
        usuario = Usuario.query.get(id)
        if not usuario:
            # essa exceção é gerida automaticamente pelo Flask, gerando uma mensagem
            # de acordo com o conteúdo do errors, no errors.py
            raise NoContentError
        return UsuarioSchema().dump(usuario)
        # return usuario_schema.dump(usuario)
        # except Exception:
        #     raise InternalServerError


class LoginResource(Resource):
    def post(self):
        try:
            # schema = LoginSchema()
            body = request.get_json()
            try:
                login = LoginSchema().load(body)
            except ValidationError as err:
                print(err.messages)
                print(err.valid_data)
                raise BadRequestError

            # if 'email' not in body or 'senha' not in body:
            #     raise BadRequestError

            usuario: Usuario = Usuario.query.filter_by(
                email=login.email).first()

            if not usuario:
                raise CredentialsInvalidError

            authorized = usuario.check_password(login.senha)

            if not authorized:
                raise CredentialsInvalidError

            expires = datetime.timedelta(days=1)
            expirationDate = genExpDateInMilSecs(expires)
            access_token = create_access_token(identity=str(
                usuario.id__usuario), expires_delta=expires,)
            return {'token': access_token, 'nome': usuario.nome, 'email': usuario.email, 'expires': expirationDate}, 200
        except (UnauthorizedError):
            raise UnauthorizedError
        except (CredentialsInvalidError):
            raise CredentialsInvalidError
        except (BadRequestError):
            raise BadRequestError
        except (Exception) as e:
            raise InternalServerError


class CovidListResource(Resource):
    @jwt_required()
    def post(self):
        try:
            id_usuario = get_jwt_identity()
            body = request.get_json()
            if id_usuario:
                body['id__usuario'] = int(id_usuario)
            covid = CovidSchema().load(body)
            db.session.add(covid)
            db.session.commit()
        except Exception as e:
            raise InternalServerError

    @jwt_required()
    def get(self):
        result = CovidAnamnese.query.all()
        return CovidSchema().dump(result, many=True)


class PacienteListResouce(Resource):
    # @jwt_required()
    def get(self, name):
        _name = str.lower(name) or ''
        result = CovidAnamnese.query.filter(
            CovidAnamnese.nome_paciente.ilike(f"%{_name}%"))
        return CovidSchema(only=['nome_paciente', 'data_nasc_paciente'], many=True).dump(result)
