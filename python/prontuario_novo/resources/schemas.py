from app import ma
from .models import TipoUsuario, Usuario


class UsuarioSchema(ma.SQLAlchemyAutoSchema):
# class UsuarioSchema(ma.Schema):
    class Meta:
        # fields = ('nome', 'email', 'senha')
        model = Usuario


class TipoUsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TipoUsuario


usuarios_schema = UsuarioSchema(many=True)
usuario_schema = UsuarioSchema()
