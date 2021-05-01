from marshmallow.decorators import post_load
from marshmallow import Schema, fields
from app import ma
from .models import CovidAnamnese, Login, TipoUsuario, Usuario


class LoginSchema(ma.Schema):
    email = fields.Str(required=True)
    senha = fields.Str(required=True)
    login_date = fields.DateTime()

    @post_load
    def make_login(self, data, **kwargs):
        return Login(**data)


class TipoUsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TipoUsuario


class UsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Usuario

    tipo_usuario = ma.Nested(TipoUsuarioSchema(only=('nome',)))


class CovidSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CovidAnamnese

    @post_load
    def make_covid(self, data, **kwargs):
        return CovidAnamnese(**data)


usuarios_schema = UsuarioSchema(many=True)
usuario_schema = UsuarioSchema()
