from flask import request
from resources.utils import genExpDateInMilSecs
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_restful import Resource
import datetime
from app import db
from .schemas import CovidSchema, LoginSchema, PacienteSchema, UsuarioSchema, usuarios_schema, usuario_schema, paciente_schema, pacientes_schema
from .models import CovidAnamnese, Login, Paciente, Usuario
from resources.errors import BadRequestError, CredentialsInvalidError, MissingAuthorizationTokenError, NoContentError, UnauthorizedError, InternalServerError, _IntegrityError
from flask_jwt_extended.exceptions import NoAuthorizationError
from marshmallow.exceptions import ValidationError
from sqlalchemy.exc import IntegrityError


class UsuariosResource(Resource):
    # @jwt_required()
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


class PacientesResource(Resource):
    @jwt_required()
    def get(self):
        try:
            header = request.headers.get('App-Finalidade')
            args = request.args
            obj_attr = Paciente.__getattribute__(Paciente, 'nome')

            if args and 'field_name' in args.keys() and 'field_value' in args.keys():
                filter_field, filter_value = args['field_name'], args['field_value']
                obj_attr = Paciente.__getattribute__(Paciente, filter_field)
                pacientes = Paciente.query.filter(
                    obj_attr.ilike(f'%{filter_value}%')).order_by(obj_attr.asc())
            else:
                pacientes = Paciente.query.order_by(obj_attr.asc()).all()

            if not header or header == 'cadastro':
                return PacienteSchema(many=True).dump(pacientes)

            pacientes_schema = PacienteSchema(
                only=['id__paciente', 'nome', 'dt_nasc'], many=True)

            return pacientes_schema.dump(pacientes)

        except Exception as e:
            return e

    @jwt_required()
    def post(self):
        try:
            body = request.get_json()
            # paciente2 = Paciente(**body)
            paciente = PacienteSchema().load(body)
            db.session.add(paciente)
            db.session.commit()
            return paciente_schema.dump(paciente)
        except IntegrityError:
            raise _IntegrityError
        except ValidationError:
            raise BadRequestError
        except Exception as e:
            raise InternalServerError


class PacienteResource(Resource):
    @jwt_required()
    def get(self, id):
        try:
            paciente = Paciente.query.get(id)
            return paciente_schema.dump(paciente)
        except Exception as e:
            return e

    @jwt_required()
    def put(self, id):
        try:
            body = request.get_json()
            paciente = Paciente.query.filter_by(id__paciente=id).update(body)
            db.session.commit()
            return {"id": id, "resultado": paciente}
        except NoAuthorizationError as e:
            raise MissingAuthorizationTokenError
        except Exception as e:
            raise InternalServerError


class CovidListResource(Resource):
    @jwt_required()
    def post(self):
        try:
            body = request.get_json()
            covid = CovidSchema().load(body)
            db.session.add(covid)
            db.session.commit()
        except Exception as e:
            raise InternalServerError

    @jwt_required()
    def get(self):
        result = CovidAnamnese.query.all()
        return CovidSchema().dump(result, many=True)
